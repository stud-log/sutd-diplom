import { Button } from 'shared/ui/Button';
import { FC } from 'react';
import { UserProfile } from 'widgets/UserProfile';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ProfileTab.module.scss';

interface ProfileTabProps {
  className?: string;
}

export const ProfileTab: FC<ProfileTabProps> = ({ className }) => {

  return (
    <div className={classNames(cls.ProfileTab, {}, [ className ])}>
      <UserProfile size='big' />
    </div>
  );
};