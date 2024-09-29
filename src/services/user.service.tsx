import { Achievement, Group, User, UserNotification } from "@stud-log/news-types/models";
import { ErrorResponse, StudlogEvent, UserAfterLoginOrRegistrationResponse } from "@stud-log/news-types/server";
import axios, { AxiosError } from 'axios';
import { message, notification } from 'antd';

import { $api } from 'shared/http/host';
import AppHistory from "shared/config/history";
import NotificationIcon from 'shared/assets/img/icons/bell.svg';
import { RegDTO } from "@stud-log/news-types/dto/reg.dto";
import { ResetPasswordDTO } from "@stud-log/news-types/dto";
import { getStaticLink } from "shared/lib/helpers/getStaticLink";
import { mutate as globalMutate } from "swr";
import { notificationsActions } from "widgets/Notifications/model/slice";
import socketService from "./socket.service";
import { store } from "app/providers/ReduxProvider/ui/ReduxProvider";
import { trophyActions } from "features/TrophyButton/model/slice";

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

  getUserPreferredName (user: User) {
    return user.settings.displayingName === 'fio' ? `${user.firstName} ${user.lastName}` : user.nickname;
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
      role: user.role,
      settings: user.settings
    }));
  }

  async login(email: string, password: string, role: 'teacher' | 'student') {
    try {
      const response = await $api.post<UserAfterLoginOrRegistrationResponse>('/api/users/login', { email, password, role });
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

  async checkUnseenNotifications() {
    try {
      const response = await $api.get<boolean>(`/api/users/notifications/checkUnSeen`);
      if(response.data == true) {
        store.dispatch(notificationsActions.setIsSeen({ isSeen: true }));
      }
      else {
        store.dispatch(notificationsActions.setIsSeen({ isSeen: false }));
      }
     
    } catch (e) {
      console.error('Error while check unseen notifications: ', e);
    }
  }

  async markNotificationsAsSeen(noteId?: number) {
    try {
      const response = await $api.get<boolean>(`/api/users/notifications/markAsSeen`, { params: { ...(noteId ? { noteId } : {}) } });
      this.checkUnseenNotifications();
     
    } catch (e) {
      console.error('Error while check unseen notifications: ', e);
    }
  }

  async checkUnseenAchievements() {
    try {
      const response = await $api.get<boolean>(`/api/users/achievements/checkUnSeen`);
      if(response.data == true) {
        store.dispatch(trophyActions.setIsSeen({ isSeen: true }));
      }
      else {
        store.dispatch(trophyActions.setIsSeen({ isSeen: false }));
      }
     
    } catch (e) {
      console.error('Error while check unseen achievements: ', e);
    }
  }

  async markAchievementsAsSeen(noteId?: number) {
    try {
      const response = await $api.get<boolean>(`/api/users/achievements/markAsSeen`);
      this.checkUnseenAchievements();
     
    } catch (e) {
      console.error('Error while check unseen achievements: ', e);
    }
  }

  async subscribeOnServerEvents() {
    try {
      const { id: myUserId } = this.getUser();
      const socket = socketService.getSocket();
    
      socket?.on('achievementReceived', (data: {userId: number; achievement: Achievement}) => {
        if(data.userId == myUserId) {
          store.dispatch(notificationsActions.setIsSeen({ isSeen: true }));
          notification.info({
            icon: <NotificationIcon />,
            message: `Получено новое достижение: "${data.achievement.title}"`,
            onClick: () => { AppHistory.push(`/achievements`); },
          });
        }
      });
      
      socket?.on('notification', (data: {userId: number; notification: UserNotification; icon?: string}) => {
        if(data.userId == myUserId) {
          store.dispatch(notificationsActions.setIsSeen({ isSeen: true }));
          notification.info({
            icon: <NotificationIcon />,
            message: data.notification.author.firstName + ' ' + data.notification.author.lastName + ' ' + data.notification.title.toLowerCase(),
            description: data.notification.content,
            onClick: () => {
              this.markNotificationsAsSeen(data.notification.id);
              AppHistory.push(`${data.notification.record?.recordTable}/${data.notification.record?.recordId}`);
            },
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