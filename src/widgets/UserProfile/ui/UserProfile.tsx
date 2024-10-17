import AvatarPlaceholder from '@/shared/assets/img/avatar-placeholder.svg?react';
import { FC } from 'react';
import { MentorControls } from '@/features/Profile/MentorControls/MentorControls';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './UserProfile.module.scss';
import { getStaticLink } from '@/shared/lib/helpers/getStaticLink';
import { useNavigate } from 'react-router-dom';
import userService from '@/services/user.service';

interface UserProfileProps {
  className?: string;
  variant: 'expanded' | 'small';
  infoClass?: string;
}

export const UserProfile: FC<UserProfileProps> = ({ className, variant, infoClass }) => {
  const { firstName, lastName, avatarUrl, group, role, settings } = userService.getUser();
  const navigator = useNavigate();
  return (
    <div className={classNames(cls.UserProfile, {}, [ className, cls[variant] ])} onClick={() => navigator('/profile')}>
      <div className={cls.wrapper}>
        <div className={cls.avatar}>
          {avatarUrl ? <img src={getStaticLink(avatarUrl)} alt="user-avatar" /> : <AvatarPlaceholder /> }
        </div>
        <div className={classNames(cls.userInfo, {}, [ infoClass ])}>
          <div className={cls.userInfoGroup}>{variant == 'expanded' && role.title} {group.name}</div>
          <div className={cls.userInfoFIO} style={{ color: settings.nickColor || 'inherit' }}>{firstName} {lastName}</div>
          <div className={cls.controls}>
            {variant == 'expanded' && (
              <MentorControls />
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
};