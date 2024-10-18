import { FC } from 'react';
import LogoIcon from '@/shared/assets/img/logo.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AppLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const AppLoader: FC<PageLoaderProps> = ({ className }) => {

  return (
    <div className={classNames(cls.PageLoader, {}, [ className ])}><LogoIcon /></div>
  );
};