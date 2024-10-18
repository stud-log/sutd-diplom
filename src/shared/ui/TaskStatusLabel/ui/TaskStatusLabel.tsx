import { FC } from 'react';
import { HomeworksStatusRU } from '@/shared/lib/types/homework';
import { UserTaskStatus } from '@stud-log/news-types/enums';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './TaskStatusLabel.module.scss';

interface TaskStatusLabelProps {
  className?: string;
  recordId?: number;
  status?: string;
}

export const TaskStatusLabel: FC<TaskStatusLabelProps> = ({ className, recordId, status = 'notInProgress' }) => {
  return (
    <div className={classNames(cls.TaskStatusLabel, {
      [cls.noStatus]: status == 'notInProgress',
      [cls.inProgress]: status == UserTaskStatus.inProgress,
      [cls.feedback]: status == UserTaskStatus.feedback,
      [cls.passed]: status == UserTaskStatus.passed,
    }, [ className ])}>
      {status !== 'notInProgress' ? HomeworksStatusRU[status as keyof typeof HomeworksStatusRU] : 'Не начато'}
    </div>
  );
};