import { $api } from "shared/http/host";
import { AxiosError } from "axios";
import { ErrorResponse } from "@stud-log/news-types/server";
import { HomeworkType } from "@stud-log/news-types/enums";
import { NewsLabelsOptions } from "widgets/Modals/ProfileModals/AddAndEditModal/types";
import { notification } from "antd";

export interface CreateNewPostFromValues {
  label: string;
  title: string;
  subjectId: number;
  content: string;
  type: string;
  files: File[];
  cover: File;
  recordTable: 'Homework' | 'News';
  recordId: number;
  startDate: string;
  endDate: string;
}

class PostService {

  async sendPost (values: CreateNewPostFromValues) {
    try {
      const isNewRecord = values.recordId == -1;

      const formData = new FormData();
      formData.append('recordId', values.recordId.toString());
      formData.append('recordTable', values.recordTable);
      formData.append('title', values.title);
      formData.append('content', values.content);
      values.files.forEach((file) => {
        formData.append(`files`, file);
      });
      // News properties
      formData.append('cover', values.cover);
      formData.append('label', values.label || NewsLabelsOptions[0].value);
      // Homework properties
      formData.append('subjectId', values.subjectId.toString());
      formData.append('type', values.type || HomeworkType.individual);
      formData.append('startDate', values.startDate);
      formData.append('endDate', values.endDate);

      await $api.post(`/api/record/post/${values.recordTable}/${values.recordId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      notification.success({
        message: 'Успешно!',
        description: `Запись ${isNewRecord ? 'создана' : 'изменена'}`,
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

export default new PostService();