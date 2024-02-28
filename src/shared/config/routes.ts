import React, { FC, LazyExoticComponent, ReactElement } from 'react';

const MainPage = React.lazy(() => import('pages/MainPage'));
const TaskPage = React.lazy(() => import('pages/TaskPage'));

export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<FC>;
}

const routes: IRoute[] = [
  { path: '/main', name: 'Новости', element: MainPage },
  { path: '/task', name: 'Домашка', element: TaskPage },

];

export default routes;
