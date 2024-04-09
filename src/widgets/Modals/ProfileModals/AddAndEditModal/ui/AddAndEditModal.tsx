import { DatePicker, Modal } from 'antd';
import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { HomeworksTypeOptions, NewsLabelsOptions, validationSchema } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import CloseIcon from 'shared/assets/img/icons/x-close.svg';
import { Input } from 'shared/ui/Input';
import { RangePicker } from 'shared/ui/DatePicker/RangePicker/RangePicker';
import { RichEditor } from 'shared/ui/RichEditor';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { Select } from 'shared/ui/Select';
import { UploadInput } from 'shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from 'shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { addAndEditModalActions } from '../slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './AddAndEditModal.module.scss';
import modalCls from '../../../Modals.module.scss';
import postService from 'services/post.service';
import { truncate } from 'shared/lib/helpers/truncateWords';
import useGroupSubjects from 'shared/hooks/useGroupSubjects';

interface AddAndEditModalProps {
  className?: string;
}

export const AddAndEditModal: FC<AddAndEditModalProps> = ({ className }) => {
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen, recordId, recordTable } = useSelector<RootStateSchema, RootStateSchema['addAndEditModal']>(state => state.addAndEditModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(addAndEditModalActions.closeModal());
  const subjects = useGroupSubjects();

  const { data: post, error, mutate }: SWRResponse = useSWR(
    recordId != -1 ? `/api/record/post/${recordTable}/${recordId}` : null,
    $apiGet,
  );
  const isPostExists = !!post;
  const isNews = recordTable == 'News';
  const isHomework = recordTable == 'Homework';

  const headerText = recordId !== -1 ? `Редактирование ${isNews ? "новости" : "домашки"}` : `Добавление ${isNews ? "новости" : "домашки"}`;
  return (
    <Modal destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.AddAndEditModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className='h1'>{headerText}</div>
      <div className={cls.formWrapper}>
        <Formik
          initialValues={{
            label: isPostExists && isNews ? post.label : '',
            title: isPostExists ? post.title : '',
            subjectId: isPostExists && isHomework ? post.subjectId : '',
            content: isPostExists ? post.content : '',
            type: isPostExists && isHomework ? post.type : HomeworksTypeOptions[0].value,
            files: [] as File[],
            cover: {} as File,
            startDate: isPostExists && isHomework ? post.startDate : '',
            endDate: isPostExists && isHomework ? post.endDate : '',
            recordTable,
            recordId,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            setLoading(true);
            const result = await postService.sendPost(values);
            setLoading(false);
            if(result == true) {
              closeModal();
            }
          }}
        >
          {({ setFieldValue, submitForm, values, errors, touched }) =>
            <Form>
              {isHomework && <div className={cls.selectWrapper}>
                <Select asFormikField={{ error: touched.subjectId ? errors.subjectId as string : undefined, passed: !!touched.subjectId && !errors.subjectId }} className={cls.select} options={subjects} onSelect={v => setFieldValue('subjectId', v.id)} defaultOption={subjects?.find(i => i.id == values.subjectId)} defaultText='Выбрать предмет'/>
                <Select asFormikField={{ error: touched.type ? errors.type as string : undefined, passed: !!touched.type && !errors.type }} className={cls.select} options={HomeworksTypeOptions} onSelect={v => setFieldValue('type', v.value)} defaultOption={HomeworksTypeOptions.find(i => i.value == values.type)}/>
              </div>}
              {isHomework && <div className={cls.mb}>
                <RangePicker showTime
                  defaultValue={isPostExists ? [ values.startDate, values.endDate ] : undefined}
                  asFormikField={{ error: touched.startDate ? errors.startDate as string || errors.endDate as string : undefined, passed: !!touched.startDate && !errors.startDate }}
                  onChange={([ startDate, endDate ]) => {
                    setFieldValue('startDate', startDate);
                    setFieldValue('endDate', endDate);
                  }} />
              </div>}
              {isNews && <Select asFormikField={{ error: touched.label ? errors.label as string : undefined, passed: !!touched.label && !errors.label }} className={cls.select} options={NewsLabelsOptions} onSelect={v => setFieldValue('label', v.value)} defaultOption={NewsLabelsOptions.find(({ value }) => value == values.label)} defaultText={'Выберите тему'}/>}
              <Input name='title' label='Заголовок' className={cls.mb} inputClassName={cls.headerInput} maxLength={65} required/>
              <RichEditor name="content" label='Описание' className={cls.mb} required/>
              <div className={cls.uploadSection}>
                <UploadInput name='files' multiple maxWeight={10} >Добавить файлы</UploadInput>
                {isNews && <UploadInput name='cover' maxWeight={1} accept='image/*' >{truncate.apply(values.cover.name ?? 'Добавить обложку', [ 16, false ])}</UploadInput>}
              </div>
              <UploadedFilesControl className={cls.mb}/>
              <Button onClick={submitForm} size='md' loading={loading}>Опубликовать</Button>
            </Form>
          }
        </Formik>
      </div>
    </Modal>
  );
};