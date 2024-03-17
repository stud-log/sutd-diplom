import { ErrorResponse, UserAfterLoginOrRegistrationResponse } from "@stud-log/news-types/server";
import { Group, User } from "@stud-log/news-types/models";
import axios, { AxiosError } from 'axios';

import { $api } from 'shared/http/host';
import { RegDTO } from "@stud-log/news-types/dto/reg.dto";
import { ResetPasswordDTO } from "@stud-log/news-types/dto";
import { notification } from 'antd';

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
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      if(error.response && error.response.status === 401) {
        window.location.href = `${process.env.THIS_URL}/login`;
      }
    }
  }
}

export default new UserService();