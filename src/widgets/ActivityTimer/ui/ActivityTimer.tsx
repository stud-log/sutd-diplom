import { FC } from 'react';
import TimerIcon from 'shared/assets/img/timer.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ActivityTimer.module.scss';

interface ActivityTimerProps {
  className?: string;
}

export const ActivityTimer: FC<ActivityTimerProps> = ({ className }) => {
  const newActivity = () => {};
  return (
    <button onClick={newActivity} className={classNames(cls.ActivityTimer, {}, [ className ])}>
      <TimerIcon />
    </button>
  );
};