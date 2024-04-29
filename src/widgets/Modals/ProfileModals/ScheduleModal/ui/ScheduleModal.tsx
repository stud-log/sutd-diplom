import { FC, useState } from 'react';
import { Form, Formik } from 'formik';
import { InitialValues, validationSchema } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse, mutate as globalMutate } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import CloseIcon from 'shared/assets/img/icons/x-close.svg';
import { EditableWeekday } from '../components/EditableWeekday/EditableWeekday';
import { Input } from 'shared/ui/Input';
import { Modal } from 'antd';
import { RangePicker } from 'shared/ui/DatePicker/RangePicker/RangePicker';
import { RichEditor } from 'shared/ui/RichEditor';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { Select } from 'shared/ui/Select';
import { Timetable } from '@stud-log/news-types/models';
import { TimetableWeekdays } from '@stud-log/news-types/enums';
import { UploadInput } from 'shared/ui/UploadInput/ui/UploadInput';
import { UploadedFilesControl } from 'shared/ui/UploadInput/components/UploadedFilesControl/UploadedFilesControl';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ScheduleModal.module.scss';
import { scheduleModalActions } from '../slice';
import scheduleService from 'services/schedule.service';
import userService from 'services/user.service';

interface ScheduleModalProps {
  className?: string;
}

export const ScheduleModal: FC<ScheduleModalProps> = ({ className }) => {
  const { id: groupId } = userService.getGroup();
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen } = useSelector<RootStateSchema, RootStateSchema['scheduleModal']>(state => state.scheduleModal);
  const [ activeKey, setActiveKey ] = useState<string | string[]>('');

  const dispatch = useDispatch();
  const closeModal = () => dispatch(scheduleModalActions.closeModal());

  const { data: timetable, error }: SWRResponse<Timetable[]> = useSWR(
    groupId != -1 ? `/api/schedule/timetable/${groupId}` : null,
    $apiGet,
  );
  
  return (
    <Modal destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.AddAndEditModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className='h1'>Изменение расписания</div>
      <div className={cls.formWrapper}>
        <Formik
          initialValues={{
            Mon: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Mon) : [],
            Tue: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Tue) : [],
            Wed: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Wed) : [],
            Thu: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Thu) : [],
            Fri: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Fri) : [],
            Sat: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Sat) : [],
            Sun: timetable ? timetable.filter(t => t.weekday == TimetableWeekdays.Sun) : [],
          } as InitialValues}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={async (values) => {
            const arrayFromValues = Object.values(values).flat() as Timetable[];
            setLoading(true);
            const result = await scheduleService.updateGroupSchedule(groupId, arrayFromValues);
            setLoading(false);
            if(result == true) {
              closeModal();
              globalMutate((key:string) => key.includes('api/schedule'));
            }
          }}
        >
          {({ setFieldValue, submitForm, values, errors, touched }) =>
            <Form>
              
              {Object.keys(values).map(aWeekday => {
                return <EditableWeekday key={aWeekday} weekday={aWeekday as keyof InitialValues} activeKey={activeKey} setActiveKey={(key) => setActiveKey(key)}/>;
              })}

              <div className={cls.saveBtn}><Button loading={loading} size='md' onClick={submitForm}>Сохранить данные</Button></div>
            </Form>
          }
        </Formik>
      </div>
    </Modal>
  );
};