import React, { FC, LazyExoticComponent, ReactElement } from 'react';

import MainPageIcon from 'shared/assets/img/menu/news.svg';
import SchedulePageIcon from 'shared/assets/img/menu/schedule.svg';
import TaskPageIcon from 'shared/assets/img/menu/hw.svg';

const MainPage = React.lazy(() => import('pages/MainPage'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
const ProfileSettingsPage = React.lazy(() => import('pages/ProfileSettingsPage'));
const TaskPage = React.lazy(() => import('pages/TaskPage'));
const SingleTaskPage = React.lazy(() => import('pages/SingleTaskPage'));
const SingleNewsPage = React.lazy(() => import('pages/SingleNewsPage'));
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
  { path: '/homeworks', name: 'Домашка', element: TaskPage, icon: TaskPageIcon },
  { path: '/schedule', name: 'Расписание', element: SchedulePage, icon: SchedulePageIcon },

];

const restRoutes: IRoute[] = [
  { path: '/profile', name: 'Профиль', element: ProfilePage },
  { path: '/profile/settings', name: 'Настройки профиля', element: ProfileSettingsPage },
  { path: '/homework/:recordId', name: 'Домашка', element: SingleTaskPage },
  { path: '/news/:recordId', name: 'Новость', element: SingleNewsPage }
];

export const routes = menuRoutes.concat(restRoutes);

