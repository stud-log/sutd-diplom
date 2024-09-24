import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import CloseIcon from 'shared/assets/img/icons/x-close.svg';
import { Comments } from 'widgets/Comments';
import { Deadline } from 'features/Deadline';
import { Interweave } from 'interweave';
import { Modal } from 'antd';
import { RecordFiles } from 'features/RecordFiles';
import { RootStateSchema } from 'app/providers/ReduxProvider';
import { UserTask } from '@stud-log/news-types/models';
import { addAndEditCustomTodoActions } from 'widgets/Modals/ProfileModals/AddAndEditCustomTodo/slice';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './CustomActivityModal.module.scss';
import { customActivityModalActions } from '../slice';
import moment from 'moment';
import userService from 'services/user.service';
import { GetEntity } from '@stud-log/news-types/server/post.response';
import { GetSchedule } from '@stud-log/news-types/server';
import { addAndEditCustomActivityActions } from 'widgets/Modals/ProfileModals/AddAndEditCustomActivity/slice';

interface CustomActivityModalProps {
  className?: string;
}

export const CustomActivityModal: FC<CustomActivityModalProps> = ({ className }) => {
  const { id } = userService.getUser();
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen, recordId } = useSelector<RootStateSchema, RootStateSchema['customActivityModal']>(state => state.customActivityModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(customActivityModalActions.closeModal());

  const { data: record, error, mutate }: SWRResponse<GetSchedule[]> = useSWR(
    isModalOpen && recordId != -1 ? `/api/schedule/one/${recordId}` : null,
    $apiGet,
  );

  const innerRecord = record?.at(0) || null;
  const customActivity = innerRecord?.calendar?.customActivity[0] || null;
 
  return (
    <Modal maskClosable={true} onCancel={closeModal} destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.HomeworkTaskModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className={cls.formWrapper}>
        {innerRecord && customActivity && (
          <div className={cls.wrapper}>
            <div className={cls.top}>
              <span className={cls.subject}>Событие</span>
              <span className={cls.date}>{moment(customActivity.startDate).format('DD.MM HH:mm')} - {moment(customActivity.endDate).format('DD.MM HH:mm')}</span>
            </div>
            <div className={cls.title}>
              {customActivity.title}
              <Button purpose='edit' outline size='md' onClick={() => {
                closeModal();
                dispatch(addAndEditCustomActivityActions.openModal({ recordId: innerRecord.id }));
              }} /></div>
            <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
              <Interweave content={customActivity.description}/>
            </div>
            <div className={cls.filesWrapper}>
              {/* TODO: wtf??? resolve types! */}
              <RecordFiles files={(innerRecord as any).files} />
            </div>
            <div className={cls.comments}>
              {/* TODO: wtf??? resolve types! */}
              <Comments afterChange={mutate} variant='comments' comments={(innerRecord as any).comments} recordId={innerRecord.id}/>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};