import { HomeworkType, UserTaskStatus } from "@stud-log/news-types/enums";

import { $api } from "shared/http/host";
import { AxiosError } from "axios";
import { EmojiClickData } from "emoji-picker-react";
import { ErrorResponse } from "@stud-log/news-types/server";
import { NewsLabelsOptions } from "widgets/Modals/ProfileModals/AddAndEditModal/types";
import { UserReaction } from "@stud-log/news-types/models";
import { notification } from "antd";

export interface CreateNewPostFromValues {
  label: string;
  title: string;
  subjectId: number;
  content: string;
  type: string;
  modalFiles: File[];
  cover: File;
  recordTable: 'Homework' | 'News';
  recordId: number;
  startDate: string;
  endDate: string;
  filesToDelete: number[];
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
      formData.append('filesToDelete', JSON.stringify(values.filesToDelete));
      values.modalFiles.forEach((file) => {
        if(!(file as any).id){
          /** means we load new files */
          formData.append(`files`, file);
        }
      });
      // News properties
      if(!(values.cover as any).id) {
        /** means we load new image */
        formData.append('cover', values.cover);
      }
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

  async commentPost (values: {recordId: number; content: string; title: string; parentId: number; isNote: number; commentFiles: File[]}) {
    try {

      const formData = new FormData();
      formData.append('recordId', values.recordId.toString());
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('parentId', values.parentId.toString());
      formData.append('isNote', `${values.isNote}`);

      values.commentFiles.forEach((file) => {
        if(!(file as any).id){
          /** means we load new files */
          formData.append(`files`, file);
        }
      });

      await $api.post(`/api/record/post/comment`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

  async reactPost (
    recordId: number,
    reaction: EmojiClickData
  ) {
    try {
      return (await $api.post<UserReaction>(`/api/record/post/react`, { recordId, type: reaction.unified, imageUrl: reaction.imageUrl })).data;
      
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
      return false;
    }
  }

  async favoritePost (
    recordId: number,
  ) {
    try {
      return (await $api.post(`/api/record/post/favorite`, { recordId })).data;
    } catch (e) {
      const error = e as AxiosError<ErrorResponse>;
      notification.warning({
        message: 'Что-то пошло не так...',
        description: error.response?.data.message,
      });
      return false;
    }
  }

  async viewPost (
    recordId: number,
  ) {
    try {
      return (await $api.post(`/api/record/post/view`, { recordId })).data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async changeHomeworkStatus (
    recordId: number,
    status: keyof typeof UserTaskStatus,
  ) {
    try {
      await $api.post(`/api/record/post/Homework-changeStatus`, { recordId, status });
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
}

export default new PostService();