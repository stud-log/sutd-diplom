import { Achievement, Group, User, UserNotification } from "@stud-log/news-types/models";
import { ErrorResponse, StudlogEvent, UserAfterLoginOrRegistrationResponse } from "@stud-log/news-types/server";
import axios, { AxiosError } from 'axios';
import { message, notification } from 'antd';

import { $api } from 'shared/http/host';
import NotificationIcon from 'shared/assets/img/icons/bell.svg';
import { RegDTO } from "@stud-log/news-types/dto/reg.dto";
import { ResetPasswordDTO } from "@stud-log/news-types/dto";
import { getStaticLink } from "shared/lib/helpers/getStaticLink";
import socketService from "./socket.service";

class UserService {

  getGroup () {
    const localUser = localStorage.getItem('user');
    
    const user = JSON.parse(localUser as string) as User;
    return user.group as Group;
  }

  getAvatar () {
    const localUser = localStorage.getItem('user');
    
    const user = JSON.parse(localUser as string) as User;
    return `${user.avatarUrl}`;
  }

  getFio () {
    const localUser = localStorage.getItem('user');
    
    const user = JSON.parse(localUser as string) as User;
    return `${user.firstName} ${user.lastName}`;
    
  }

  getUser () {
    const localUser = localStorage.getItem('user');
    return JSON.parse(localUser as string) as User;
  }

  async getAndSaveUserFromServer () {
    const response = await $api.get<User>('/api/users/me');
    this.saveLocalUser(response.data);
  }

  saveLocalUser(user: User){
    localStorage.setItem('user', JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.avatarUrl,
      group: user.group,
      id: user.id,
      role: user.role
    }));
  }

  async login(email: string, password: string) {
    try {
      const response = await $api.post<UserAfterLoginOrRegistrationResponse>('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.accessToken);
      this.saveLocalUser(response.data.user);
      notification.success({
        message: 'Успешно!',
        description: 'Выполнен вход в систему',
      });
      return true;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
      return false;
    }
  }

  async registration(regDto: RegDTO) {
    try {
      const response = await $api.post<UserAfterLoginOrRegistrationResponse>('/api/users/reg', regDto);
      localStorage.setItem('token', response.data.accessToken);
      this.saveLocalUser(response.data.user);
      return true;
      
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
      return false;
    }
  }

  async recoveryRequest(email: string) {
    try {
      return await $api.post<{result: boolean}>('/api/users/recovery', { email });
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
    }
  }

  async recoveryWithGivenLink(passRecoveryDTO: ResetPasswordDTO) {
    try {
      return await $api.post<{result: boolean}>('/api/users/recovery/update', passRecoveryDTO);
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
    }
  }

  async logout() {
    try {
      await $api.post<UserAfterLoginOrRegistrationResponse>('/api/users/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('guide');
      window.location.href = `${process.env.THIS_URL}/login`;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
    }
  }

  async updateUser(values: Partial<User>) {
    try {
      const user = await $api.post<User>('/api/users/update', values);
      localStorage.removeItem('user');
      this.saveLocalUser(user.data);
      notification.success({
        message: 'Успешно!',
        description: 'Изменения сохранены',
      });
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
    }
  }

  async checkAuth() {
    try {
      const response = await axios.get<UserAfterLoginOrRegistrationResponse>(`${process.env.API_URL}/api/users/refresh`, { withCredentials: true });
      localStorage.setItem('token', response.data.accessToken);
      this.saveLocalUser(response.data.user);
      return true;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      if(error.response && error.response.status === 401) {
        window.location.href = `${process.env.THIS_URL}/login`;
      }
    }
  }

  async isGuideSeen() {
    try {
      const guide = localStorage.getItem('guide');
      if(guide && guide == '1') { return true; }
      const response = await $api.get<boolean>(`/api/users/checkGuide`);
      if(response.data == true) {
        localStorage.setItem('guide', '1');
        return true;
      } else {
        localStorage.setItem('guide', '0');
        return false;
      }
    } catch (e) {
      console.log(e);

    }
  }

  async seenGuideline() {
    try {
      const response = await $api.post<boolean>(`/api/users/seenGuideline`);
      if(response.data == true) {
        localStorage.setItem('guide', '1');
        return true;
      }
    } catch (e) {
      console.log(e);

    }
  }

  async subscribeOnServerEvents() {
    try {
      const { id: myUserId } = this.getUser();
      const socket = socketService.getSocket();
    
      socket?.on('achievementReceived', (data: {userId: number; achievement: Achievement}) => {
        if(data.userId == myUserId) {
          message.info({
            content: `Получено новое достижение: "${data.achievement.title}"`,
            onClick: () => {window.location.href = `${process.env.THIS_URL}/profile`; },
          });
        }
      });
      
      socket?.on('notification', (data: {userId: number; notification: UserNotification; icon?: string}) => {
        if(data.userId == myUserId) {
          notification.info({
            icon: <NotificationIcon />,
            message: data.notification.title,
            description: data.notification.content,
            onClick: () => { window.location.href = `${process.env.THIS_URL}/${data.notification.record?.recordTable}/${data.notification.record?.recordId}`; },
            duration: 0
          });
        }
      });
     
    } catch (e) {
      console.error('Error while subscribing: ', e);
    }
  }
}

export default new UserService();