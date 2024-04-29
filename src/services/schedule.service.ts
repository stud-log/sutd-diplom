import { $api } from "shared/http/host";
import { AxiosError } from "axios";
import { ErrorResponse } from "@stud-log/news-types/server";
import { Timetable } from "@stud-log/news-types/models";
import { notification } from "antd";

class SubjectService {
  async updateGroupSchedule (groupId: number, dto: Timetable[]) {
    try {
      await $api.post(`/api/schedule/regenerateGroupCycledTimetable/${groupId}`, dto);
            
      notification.success({
        message: 'Успешно!',
        description: `Расписание обновлено!`,
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

export default new SubjectService();