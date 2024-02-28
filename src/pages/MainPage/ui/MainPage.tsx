import { FC, useEffect, useState } from 'react';

import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './MainPage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

const MainPage: FC = () => {

  return (
    <Layout.Sticky className={cls.MainPage}>
      <Layout.StickyHeader>
        <h1>Новости</h1>
      </Layout.StickyHeader>
      <Layout.StickyContent>
        в
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(MainPage, Schedule);