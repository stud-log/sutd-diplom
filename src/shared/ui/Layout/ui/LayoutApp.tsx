import { FC, ReactNode } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './Layout.module.scss';

interface LayoutProps {
  className?: string;
  children: ReactNode;
}

export const App: FC<LayoutProps> = ({ className, children }) => {

  return (
    <div className={classNames(cls.LayoutApp, {}, [ className ])}>{children}</div>
  );
};

