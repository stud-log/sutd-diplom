import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './FavoriteTab.module.scss';

interface ProfileTabProps {
  className?: string;
}

export const FavoriteTab: FC<ProfileTabProps> = ({ className }) => {

  return (
    <div className={classNames(cls.FavoriteTab, {}, [ className ])}> Favorite </div>
  );
};