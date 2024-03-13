import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Schedule.module.scss';

interface ScheduleProps {
  className?: string;
}

export const Schedule: FC<ScheduleProps> = ({ className }) => {

  return (
    <div className={classNames(cls.Schedule, {}, [ className ])}>
      <Layout.Sticky>
        <Layout.StickyHeader slots={{
          start: <h2 className='h1'>Расписание</h2>
        }}/>
        <Layout.StickyContent>
          d
        </Layout.StickyContent>
      </Layout.Sticky>
    </div>
  );
};