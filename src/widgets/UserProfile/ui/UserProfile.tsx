import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UserProfile.module.scss';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: FC<UserProfileProps> = ({ className }) => {

  return (
    <div className={classNames(cls.UserProfile, {}, [ className ])}>
        
    </div>
  );
};