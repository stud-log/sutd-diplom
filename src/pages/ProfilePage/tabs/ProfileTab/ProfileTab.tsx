import { AchievementsStatistic, HomeworkStatistic } from 'widgets/Statistics';

import { FC } from 'react';
import { MentorControls } from 'features/Profile/MentorControls/MentorControls';
import { UserProfile } from 'widgets/UserProfile';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './ProfileTab.module.scss';

interface ProfileTabProps {
  className?: string;
}

export const ProfileTab: FC<ProfileTabProps> = ({ className }) => {
  return (
    <div className={classNames(cls.ProfileTab, {}, [ className ])}>
      <div className={cls.userProfile}>
        <UserProfile variant='expanded' />
      </div>
      <div className={cls.controls}>
        <MentorControls />
      </div>
      <div className={cls.statsWrapper}>
        <HomeworkStatistic />
        <AchievementsStatistic />
      </div>
    </div>
  );
};