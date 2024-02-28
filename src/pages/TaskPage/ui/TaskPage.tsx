import { FC, ReactElement, useEffect, useState } from 'react';

import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { Sidebar } from 'widgets/Sidebar';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './TaskPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const TaskPage: FC = () => {

  return (
    <Layout.Sticky className={cls.TaskPage}>
     
      Task Page
    </Layout.Sticky>
  );
};

export default withWidget(TaskPage, Sidebar);