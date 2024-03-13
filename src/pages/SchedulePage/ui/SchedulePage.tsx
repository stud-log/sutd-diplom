import { FC, ReactElement, useEffect, useState } from 'react';

import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { Sidebar } from 'widgets/Sidebar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './SchedulePage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const SchedulePage: FC = () => {

  return (
    <Layout.Sticky className={cls.SchedulePage}>
      <Layout.StickyHeader slots={{
        start: <h1>Расписание</h1>
      }}/>
      <Layout.StickyContent>
        Schedule Page
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default SchedulePage;