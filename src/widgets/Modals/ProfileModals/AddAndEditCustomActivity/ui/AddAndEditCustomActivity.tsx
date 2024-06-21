import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import CloseIcon from 'shared/assets/img/icons/x-close.svg';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { Input } from 'shared/ui/Input';
import { Modal } from 'antd';
import { RangePicker } from 'shared/ui/DatePicker/RangePicker/RangePicker';
import { RichEditor } from 'shared/ui/RichEditor';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { UploadInput } from 'shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from 'shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { addAndEditCustomActivityActions } from '../slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './AddAndEditCustomActivity.module.scss';
import { mutate as globalMutate } from 'swr';
import postService from 'services/post.service';
import taskService from 'services/task.service';
import useGroupSubjects from 'shared/hooks/useGroupSubjects';
import { validationSchema } from '../types';
import scheduleService from 'services/schedule.service';
import { GetSchedule } from '@stud-log/news-types/server';

interface AddAndEditCustomActivityProps {
  className?: string;
}

export const AddAndEditCustomActivity: FC<AddAndEditCustomActivityProps> = ({ className }) => {
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen, recordId } = useSelector<RootStateSchema, RootStateSchema['addAndEditCustomActivity']>(state => state.addAndEditCustomActivity);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(addAndEditCustomActivityActions.closeModal());

  const { data: post, error, mutate }: SWRResponse<GetSchedule[]> = useSWR(
    recordId != -1 && isModalOpen ? `/api/schedule/one/${recordId}` : null,
    $apiGet,
  );
  
  const innerPost = post?.at(0);
  const headerText = recordId !== -1 ? `Редактирование события` : `Добавление события`;
  const customActivity = innerPost?.calendar?.customActivity[0] || null;
  const isExists = !!customActivity;

  return (
    <Modal destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.AddAndEditModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className='h1'>{headerText}</div>
      <div className={cls.formWrapper}>
        <Formik
          initialValues={{
            recordId: recordId, // if we want to create task pinned to some record entity (team, for example). -1 is for independent
            activityId: isExists ? customActivity.id : -1, // id of this entity
            title: (isExists ? customActivity?.title : '') as string,
            description: (isExists ? customActivity?.description : '') as string,
            modalFiles: isExists && innerPost ? innerPost.files.map(file => ({ name: file.fileName, size: file.fileSize, id: file.id })) as unknown as File[] : [] as File[],
            filesToDelete: [],
            isPersonal: '1' as '1' | '0',
            startDate: (isExists ? customActivity.startDate : '') as string,
            endDate: (isExists ? customActivity.endDate : '') as string,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            setLoading(true);
            const result = await scheduleService.sendCustomActivity(values);
            setLoading(false);
            if(result == true) {
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
                  const result = await postService.removePost(recordId);
                  setLoading(false);
                  if(result == true) {
                    globalMutate((key: string) => key.includes('/api/schedule'));
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