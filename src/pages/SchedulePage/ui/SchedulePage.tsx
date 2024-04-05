import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import cls from './SchedulePage.module.scss';

const SchedulePage: FC = () => {

  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <h1>Расписание</h1>,
        
      }}/>
      <Layout.StickyContent>
        Schedule Page
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default SchedulePage;