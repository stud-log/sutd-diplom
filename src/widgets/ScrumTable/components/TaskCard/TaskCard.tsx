import CustomIcon from 'shared/assets/img/icons/customact.svg';
import { Deadline } from 'features/Deadline';
import { DraggableProvided } from 'react-beautiful-dnd';
import { FC } from 'react';
import SutdIcon from 'shared/assets/img/icons/sutd.svg';
import { UserTask } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './TaskCard.module.scss';
import { homeworkTaskModalActions } from 'widgets/Modals/HomeworkTaskModal/slice';
import moment from 'moment';
import { truncate } from 'shared/lib/helpers/truncateWords';
import { useDispatch } from 'react-redux';

interface TaskCardProps {
  className?: string;
  task: UserTask;
  provided: DraggableProvided;
}

export const TaskCard: FC<TaskCardProps> = ({ className, task, provided }) => {
  const dispatch = useDispatch();
  const homeworkTask = task.record?.homework ? task : null;
  const customTask = task.title ? task : null;

  return (
    <div className={classNames(cls.TaskCard, {}, [ className ])}>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={cls.card}
        style={{
          ...provided.draggableProps.style
        }}
      >
        {homeworkTask && (
          <div className={cls.innerWrapper} onDoubleClick={() => dispatch(homeworkTaskModalActions.openModal({ recordId: homeworkTask.id }))}>
            <div className={cls.cardHeader}>
              <div className={cls.cardHeaderInner}>
                <div className={cls.createdAt}>от {moment(homeworkTask.record!.homework!.createdAt).format('D MMM YYYY').replace('.', '')}</div>
                <div className={cls.label}><SutdIcon /></div>
              </div>
            </div>
            <div className={cls.subject}>{truncate.apply(homeworkTask.record!.homework!.subject!.title, [ 27, false ])}</div>
            <div className={cls.title}>{truncate.apply(homeworkTask.record!.homework!.title, [ 45, false ])}</div>
            <Deadline startDate={homeworkTask.record!.homework!.startDate} endDate={homeworkTask.record!.homework!.endDate} />

          </div>
        )}
        {customTask && (
          <div className={cls.innerWrapper}>
            <div className={cls.cardHeader}>
              <div className={cls.cardHeaderInner}>
                <div className={cls.createdAt}>от {moment(customTask.createdAt).format('D MMM YYYY').replace('.', '')}</div>
                <div className={cls.label}><CustomIcon /></div>
              </div>
            </div>
            <div className={cls.subject}>Моя задача</div>
            <div className={cls.title}>{truncate.apply(customTask.title, [ 45, false ])}</div>
            <Deadline startDate={customTask.createdAt} endDate={customTask.endDate} />
          </div>
        )}
      </div>
    </div>
  );
};