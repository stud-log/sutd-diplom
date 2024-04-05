import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ProfileTab.module.scss';

interface ProfileTabProps {
  className?: string;
}

export const ProfileTab: FC<ProfileTabProps> = ({ className }) => {

  return (
    <div className={classNames(cls.ProfileTab, {}, [ className ])}> Profile </div>
  );
};