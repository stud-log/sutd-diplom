import { $api } from "@/shared/http/host";
import { AxiosError } from "axios";
import { CreateNewTaskFromValues } from "@/shared/lib/types/services";
import { ErrorResponse } from "@stud-log/news-types/server";
import { UserTaskStatus } from "@stud-log/news-types/enums";
import { notification } from "antd";
import dayjs from 'dayjs';

class TaskService {

  async changeStatus (
    status: keyof typeof UserTaskStatus,
    recordId?: number,
    taskId?:number
  ) {
    try {
      await $api.post(`/api/record/post/changeStatus`, { recordId, taskId, status });
      notification.success({
        message: 'Успешно!',
        description: `Статус успешно изменен`,
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

  async sendCustomTask (values: CreateNewTaskFromValues) {
    try {
      const isNew = values.taskId == -1;
      const formData = new FormData();
      formData.append('recordId', values.recordId.toString());
      formData.append('parentId', values.parentId.toString());
      formData.append('taskId', values.taskId.toString());

      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('filesToDelete', JSON.stringify(values.filesToDelete));
      values.modalFiles.forEach((file) => {
        if(!(file as any).id){
          /** means we load new files */
          formData.append(`files`, file);
        }
      });
      
      formData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD HH:mm:ss'));
      formData.append('endDate', dayjs(values.endDate).format('YYYY-MM-DD HH:mm:ss'));
      
      const response = await $api.post(`/api/users/notifications/updateOrCreate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response);
            
      notification.success({
        message: 'Успешно!',
        description: `Задача ${isNew ? 'создана' : 'изменена'}`,
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

export default new TaskService();