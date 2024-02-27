import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {

  return (
    <div className={classNames(cls.PageLoader, {}, [ className ])}>Loading...</div>
  );
};