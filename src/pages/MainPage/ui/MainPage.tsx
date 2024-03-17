import { FC, useEffect, useState } from 'react';

import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { Select } from 'shared/ui/Select';
import cls from './MainPage.module.scss';
import { dropdownFilterOptions } from '../config';
import { withWidget } from 'shared/hooks/withWidget';

const MainPage: FC = () => {

  return (
    <Layout.Sticky className={cls.MainPage}>
      <Layout.StickyHeader slots={{
        start: <h1>Новости</h1>,
        end: <>
          <Select options={dropdownFilterOptions} onSelect={(value) => console.log(value)}/>
          
        </>
      }} />
      <Layout.StickyContent>
        в
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(MainPage, Schedule);