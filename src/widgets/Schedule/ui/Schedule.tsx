import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Schedule.module.scss';

interface ScheduleProps {
  className?: string;
}

export const Schedule: FC<ScheduleProps> = ({ className }) => {

  return (
    <div className={classNames(cls.Schedule, {}, [ className ])}> Schedule </div>
  );
};