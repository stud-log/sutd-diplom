import { FC, ReactElement, useEffect, useState } from 'react';

import { Schedule } from 'widgets/Schedule';
import { Sidebar } from 'widgets/Sidebar';
import cls from './TaskPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const TaskPage: FC = () => {

  return (
    <div className={cls.TaskPage}>
     
      Task Page
    </div>
  );
};

export default withWidget(TaskPage, Sidebar);