import { FC } from 'react';
import LogoIcon from '@/shared/assets/img/logo.svg?react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
  className?: string;
}

const Loader: FC = () => (
  <div className={cls.loader}>
    <div className={cls.gradientBorder}>
      <LogoIcon />
    </div>
  </div>);
export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
  return (
    <div className={classNames(cls.PageLoader, {}, [ className ])}><Loader /></div>
  );
};