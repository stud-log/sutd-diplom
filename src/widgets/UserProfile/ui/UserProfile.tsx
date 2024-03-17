import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UserProfile.module.scss';
import userService from 'services/user.service';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: FC<UserProfileProps> = ({ className }) => {
  const { firstName, lastName, avatarUrl, group } = userService.getUser();

  return (
    <div className={classNames(cls.UserProfile, {}, [ className ])}>
      {firstName} {lastName}
    </div>
  );
};