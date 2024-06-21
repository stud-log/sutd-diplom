import { $api } from "shared/http/host";
import { AxiosError } from "axios";
import { ErrorResponse } from "@stud-log/news-types/server";
import { Timetable } from "@stud-log/news-types/models";
import { notification } from "antd";
import { CreateNewCustomActivity } from "shared/lib/types/services";
import dayjs from 'dayjs';

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

  async sendCustomActivity (values: CreateNewCustomActivity) {
    try {
      const isNew = values.activityId == -1;
      const formData = new FormData();
      
      formData.append('activityId', values.activityId.toString());
      formData.append('recordId', values.recordId.toString());
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('filesToDelete', JSON.stringify(values.filesToDelete));
      values.modalFiles.forEach((file) => {
        if(!(file as any).id){
          /** means we load new files */
          formData.append(`files`, file);
        }
      });
      console.log(values);
      formData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD HH:mm:ss'));
      formData.append('endDate', dayjs(values.endDate).format('YYYY-MM-DD HH:mm:ss'));
      
      const response = await $api.post(`/api/schedule/custom-activities/updateOrCreate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
            
      notification.success({
        message: 'Успешно!',
        description: `Событие ${isNew ? 'добавлено' : 'изменено'}`,
      });
      return true;
    }
    catch (e) {

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