import { $api } from "shared/http/host";
import { AxiosError } from "axios";
import { ErrorResponse } from "@stud-log/news-types/server";
import { UserStatus } from "@stud-log/news-types/enums";
import { notification } from "antd";

class GroupService {
  async rejectUsers(usersToReject: number[]) {
    try {
      await $api.post(`/api/users/manage`, { accounts: usersToReject, status: UserStatus.rejected });
      notification.success({
        message: 'Успешно!',
        description: `Пользователи удалены`,
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

  async acceptUsers(usersToInvite: number[] ) {
    try {
      await $api.post(`/api/users/manage`, { accounts: usersToInvite, status: UserStatus.approved });
      notification.success({
        message: 'Успешно!',
        description: `Пользователи приняты`,
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
}

export default new GroupService();