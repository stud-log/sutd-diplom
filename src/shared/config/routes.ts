import React, { FC, LazyExoticComponent, ReactElement } from 'react';

import MainPageIcon from 'shared/assets/img/menu/news.svg';
import SchedulePageIcon from 'shared/assets/img/menu/schedule.svg';
import TaskPageIcon from 'shared/assets/img/menu/hw.svg';

const MainPage = React.lazy(() => import('pages/MainPage'));
const TaskPage = React.lazy(() => import('pages/TaskPage'));
const SchedulePage = React.lazy(() => import('pages/SchedulePage'));

export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<FC>;
  icon?: FC<React.SVGProps<SVGSVGElement>>;
}

export const menuRoutes: IRoute[] = [
  { path: '/main', name: 'Новости', element: MainPage, icon: MainPageIcon },
  { path: '/task', name: 'Домашка', element: TaskPage, icon: TaskPageIcon },
  { path: '/schedule', name: 'Расписание', element: SchedulePage, icon: SchedulePageIcon },

];

const restRoutes: IRoute[] = [];

export const routes = menuRoutes.concat(restRoutes);

