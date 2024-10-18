import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { Button } from '@/shared/ui/Button';
import CloseIcon from '@/shared/assets/img/icons/x-close.svg?react';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Input } from '@/shared/ui/Input';
import { Modal } from 'antd';
import { RangePicker } from '@/shared/ui/DatePicker/RangePicker/RangePicker';
import { RichEditor } from '@/shared/ui/RichEditor';
import { RootStateSchema } from '@/app/providers/ReduxProvider';
import { UploadInput } from '@/shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from '@/shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { addAndEditCustomTodoActions } from '../slice';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AddAndEditCustomTodo.module.scss';
import { mutate as globalMutate } from 'swr';
import postService from '@/services/post.service';
import taskService from '@/services/task.service';
import { validationSchema } from '../types';

interface AddAndEditCustomTodoProps {
  className?: string;
}

export const AddAndEditCustomTodo: FC<AddAndEditCustomTodoProps> = ({ className }) => {
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen, recordId } = useSelector<RootStateSchema, RootStateSchema['addAndEditCustomTodo']>(state => state.addAndEditCustomTodo);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(addAndEditCustomTodoActions.closeModal());

  const { data: post, error, mutate }: SWRResponse<GetEntity> = useSWR(
    recordId != -1 && isModalOpen ? `/api/record/post/UserTask/${recordId}` : null,
    $apiGet,
  );
  
  const isExists = !!post;
  const headerText = recordId !== -1 ? `Редактирование задачи` : `Добавление задачи`;

  return (
    <Modal destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.AddAndEditModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className='h1'>{headerText}</div>
      <div className={cls.formWrapper}>
        <Formik
          initialValues={{
            parentId: -1, // if we want make task dependent. -1 for independent
            recordId: -1, // if we want to create task pinned to some record entity (team, for example). -1 is for independent
            taskId: recordId, // id of this entity
            title: (isExists ? post.userTask?.title : '') as string,
            description: (isExists ? post.userTask?.description : '') as string,
            modalFiles: isExists ? post.files.map(file => ({ name: file.fileName, size: file.fileSize, id: file.id })) as unknown as File[] : [] as File[],
            filesToDelete: [],
            startDate: (isExists ? post.userTask?.startDate : '') as string,
            endDate: (isExists ? post.userTask?.endDate : '') as string,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            
            setLoading(true);
            const result = await taskService.sendCustomTask(values);
            setLoading(false);
            if(result == true) {
              globalMutate((key: string) => key.includes('/api/users/myTasks'));
              closeModal();
            }
          }}
        >
          {({ setFieldValue, submitForm, values, errors, touched }) =>
            <Form>
              
              <div className={cls.mb}>
                <RangePicker
                  showTime
                  defaultValue={isExists ? [ values.startDate, values.endDate ] : undefined}
                  asFormikField={{ error: touched.startDate ? errors.startDate as string || errors.endDate as string : undefined, passed: !!touched.startDate && !errors.startDate }}
                  onChange={([ startDate, endDate ]) => {
                    setFieldValue('startDate', startDate);
                    setFieldValue('endDate', endDate);
                  }} />
              </div>
              <Input name='title' label='Заголовок' className={cls.mb} inputClassName={cls.headerInput} maxLength={65} required/>
              <RichEditor name="description" label='Описание' className={cls.mb} required/>
              <div className={cls.uploadSection}>
                <UploadInput name='modalFiles' multiple maxWeight={10} >Добавить файлы</UploadInput>
              </div>
              <UploadedFilesControl name='modalFiles' className={cls.mb}/>
              <div className={cls.controls}>
                <Button onClick={submitForm} size='md' loading={loading}>{isExists ? 'Сохранить' : 'Опубликовать'}</Button>
                {isExists && <Button purpose='delete' showIcon={false} outline onClick={async () => {
                  setLoading(true);
                  const result = await postService.removePost(post.id);
                  setLoading(false);
                  if(result == true) {
                    globalMutate((key: string) => key.includes('/api/users/myTasks'));
                    closeModal();
                  }
                }} size='md' loading={loading}>Удалить</Button>}

              </div>
            </Form>
          }
        </Formik>
      </div>
    </Modal>
  );
};