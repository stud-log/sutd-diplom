import ClockIcon from 'shared/assets/img/icons/clock.svg';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Deadline.module.scss';
import { getRemainDeadline } from 'shared/lib/helpers/getRemainDeadline';
import moment from 'moment';

interface DeadlineProps {
  className?: string;
  startDate?: string;
  endDate?: string;
  onClick?: () => void;
}

export const Deadline: FC<DeadlineProps> = ({ className, onClick, startDate, endDate }) => {
  const { remainTime, progress, remainShort } = getRemainDeadline(startDate, endDate);
  const _endDate = moment(endDate).format('D MMM').replace('.', '');
  return (
    <div className={classNames(cls.Deadline, {
      [cls.less40]: progress > 40,
      [cls.less75]: progress > 75,
      [cls.deadlineGone]: progress == 100,
    }, [ cls.less100, className ])} onClick={onClick}><ClockIcon /> {progress < 100 ? `${_endDate} (${remainTime})` : 'Срок сдачи прошел'}</div>
  );
};