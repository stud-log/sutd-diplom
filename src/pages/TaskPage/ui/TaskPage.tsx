import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import cls from './TaskPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const TaskPage: FC = () => {

  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <h1>Домашка</h1>
      }}/>
      <Layout.StickyContent>
        Task Page
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(TaskPage, Schedule);