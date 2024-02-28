import { FC, ReactElement, useEffect, useState } from 'react';

import { Schedule } from 'widgets/Schedule';
import cls from './MainPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const MainPage: FC = () => {

  return (
    <div className={cls.MainPage}>
     
      Main Page
    </div>
  );
};

export default withWidget(MainPage, Schedule);