import React, {  LazyExoticComponent, ReactElement } from 'react';

const MainPage = React.lazy(() => import('pages/MainPage'));


export interface IRoute {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<() => ReactElement>;
}

//Добавляем роуты тут

const routes: IRoute[] = [
  { path: '/main', name: 'Главная', element: MainPage },

];

export default routes;
