import AvatarPlaceholder from 'shared/assets/img/avatar-placeholder.svg';
import { FC } from 'react';
import { User } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UserWithAvatar.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';

interface UserWithAvatarProps {
  className?: string;
  user: User;
}

export const UserWithAvatar: FC<UserWithAvatarProps> = ({ className, user }) => {

  return (
    <div className={classNames(cls.UserWithAvatar, {}, [ className ])}>
      <div className={cls.avatar}>{user.avatarUrl ? <img src={getStaticLink(user.avatarUrl)} alt="user-avatar" /> : <AvatarPlaceholder /> }</div>
      <div className={cls.name} style={{ color: user.settings.nickColor || 'inherit' }}>{user.firstName} {user.lastName}</div>
    </div>
  );
};