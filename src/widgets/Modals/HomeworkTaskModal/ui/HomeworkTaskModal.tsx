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
import cls from './HomeworkTaskModal.module.scss';
import { homeworkTaskModalActions } from '../slice';
import moment from 'moment';
import userService from 'services/user.service';

interface HomeworkTaskModalProps {
  className?: string;
}

export const HomeworkTaskModal: FC<HomeworkTaskModalProps> = ({ className }) => {
  const { id } = userService.getUser();
  const [ loading, setLoading ] = useState(false);
  const { isModalOpen, recordId } = useSelector<RootStateSchema, RootStateSchema['homeworkTaskModal']>(state => state.homeworkTaskModal);
  const dispatch = useDispatch();
  const closeModal = () => dispatch(homeworkTaskModalActions.closeModal());

  const { data: task, error, mutate }: SWRResponse<UserTask> = useSWR(
    isModalOpen && recordId != -1 ? `/api/users/getTask?taskId=${recordId}` : null,
    $apiGet,
  );

  const hw = task?.record?.homework;
  const customTask = task?.title ? task : null;

  return (
    <Modal maskClosable={true} onCancel={closeModal} destroyOnClose styles={{ body: { padding: 30 } }} width={650} closeIcon={<CloseIcon onClick={closeModal} />} className={classNames(cls.HomeworkTaskModal, {}, [ className ])} open={isModalOpen} footer={<div></div>}>
      <div className={cls.formWrapper}>
        {task && hw && (
          <div className={cls.wrapper}>
            <div className={cls.top}>
              <span className={cls.subject}>{hw.subject?.title}</span>
              <span className={cls.date}>{moment(hw?.createdAt).format('D MMM YYYY').replace('.', '')}</span>
            </div>
            <div className={cls.title}>{hw.title}</div>
            <Deadline startDate={hw.createdAt} endDate={hw.endDate} className={cls.deadline}/>
            <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
              <Interweave content={hw.content}/>
            </div>
            <div className={cls.filesWrapper}>
              <RecordFiles files={hw.record!.files} />
            </div>
            <div className={cls.comments}>
              <Comments afterChange={mutate} variant='notes' comments={task.myRecord.comments} recordId={task.myRecord.id}/>
            </div>
          </div>
        )}

        {customTask && (
          <div className={cls.wrapper}>
            <div className={cls.top}>
              <span className={cls.subject}>Моя задача</span>
              <span className={cls.date}>{moment(customTask?.startDate).format('D MMM YYYY').replace('.', '')}</span>
            </div>
            <div className={cls.title}>
              {customTask.title}
              <Button purpose='edit' outline size='md' onClick={() => {
                closeModal();
                dispatch(addAndEditCustomTodoActions.openModal({ recordId: customTask.id }));
              }} /></div>
            <Deadline startDate={customTask.startDate} endDate={customTask.endDate} className={cls.deadline}/>
            <div className={classNames(cls.content, {}, [ 'ck-content' ])}>
              <Interweave content={customTask.description}/>
            </div>
            <div className={cls.filesWrapper}>
              <RecordFiles files={customTask.myRecord!.files} />
            </div>
            <div className={cls.comments}>
              <Comments afterChange={mutate} variant='notes' comments={customTask.myRecord.comments} recordId={customTask.myRecord.id}/>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};