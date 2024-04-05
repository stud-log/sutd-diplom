import AvatarPlaceholder from 'shared/assets/img/avatar-placeholder.svg';
import { FC } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './UserProfile.module.scss';
import { useNavigate } from 'react-router-dom';
import userService from 'services/user.service';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: FC<UserProfileProps> = ({ className }) => {
  const { firstName, lastName, avatarUrl, group } = userService.getUser();
  const navigator = useNavigate();

  return (
    <div className={classNames(cls.UserProfile, {}, [ className ])} onClick={() => navigator('/profile')}>
      <div className={cls.wrapper}>
        <div className={cls.avatar}>
          {avatarUrl ? <img src={avatarUrl} alt="" /> : <AvatarPlaceholder /> }
        </div>
        <div className={cls.userInfo}>
          <div className={cls.userInfoGroup}>{group.name}</div>
          <div className={cls.userInfoFIO}>{firstName} {lastName}</div>
        </div>
      </div>
      
    </div>
  );
};