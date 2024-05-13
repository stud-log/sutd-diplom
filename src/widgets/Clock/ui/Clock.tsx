import 'moment/locale/ru';

import { ActivityTimer } from 'widgets/ActivityTimer';
import { CurrentTime } from './CurrentTime';
import { FC } from 'react';
import { Notifications } from 'widgets/Notifications';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Clock.module.scss';
import moment from 'moment';

interface ClockProps {
  className?: string;
}

export const Clock: FC<ClockProps> = ({ className }) => {
  const date = moment();
  const weekday = date.format('dd');
  const formattedDate = date.format('D MMMM');

  return (
    <div className={classNames(cls.Clock, {}, [ className ])}>
      <div className={cls.row}>
        <div className={classNames('h3', {}, [ cls.weekday ])}>{weekday}.</div>
        <div className={classNames('h3', {}, [ cls.dateMonth ])}>{formattedDate}</div>
      </div>
      <div className={cls.row}>
        <CurrentTime className={cls.currentTime}/>
        {/* <ActivityTimer /> */}
        <Notifications />
      </div>
    </div>
  );
};