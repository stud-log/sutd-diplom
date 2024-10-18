import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { Achievement } from '@stud-log/news-types/models';
import { FC } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './AchievementsList.module.scss';
import { getStaticLink } from '@/shared/lib/helpers/getStaticLink';
import { pluralize } from '@/shared/lib/helpers/dates';

interface AchievementsListProps {
  className?: string;
  receivedAchievements: Achievement[];
}

export const AchievementsList: FC<AchievementsListProps> = ({ className, receivedAchievements }) => {
  const {
    data: allAchievements,
    error,
    mutate,
  }: SWRResponse<Achievement[]> = useSWR(`/api/achievements/allWithProgress`, $apiGet);

  const unReceived = allAchievements?.filter(i => !receivedAchievements.map(i => i.id).includes(i.id));

  return (
    <div className={classNames(cls.AchievementsList, {}, [ className ])}>
      {receivedAchievements.map(achievement => {
        const avatars = achievement.trophy.avatars as {url: string}[];
        return (
          <div className={cls.card} key={achievement.id}>
            <div className={cls.image}>
              <img src={getStaticLink(achievement.imgSrc)} alt="image" />
            </div>
            <div className={cls.rightCol}>
              <div className={cls.top}>
                <div className={cls.title}>{achievement.title}</div>
                <div className={cls.description}>{achievement.description}</div>
              </div>
              <div className={cls.awards}>
                <div className={cls.awardsTitle}>Получено</div>
                <div className={cls.awardsList}>
                  {avatars.map((avatar, idx) => {
                    return <div className={cls.avatar} key={idx}><img src={getStaticLink(avatar.url)} alt="award" /></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      {unReceived && unReceived.map(achievement => {
        const avatars = achievement.trophy.avatars as {url: string}[];
        return (
          <div className={cls.card} key={achievement.id}>
            <div className={cls.image}>
              <img src={getStaticLink(achievement.imgSrc)} alt="image" />
            </div>
            <div className={cls.rightCol}>
              <div className={cls.top}>
                <div className={cls.title}>{achievement.title}</div>
                <div className={cls.description}>{achievement.description}</div>
              </div>
              <div className={cls.awards}>
                <div className={cls.awardsTitle}>{pluralize(avatars.length, 'Награда', 'Награды', 'Награды')}</div>
                <div className={cls.awardsList}>
                  {avatars.map((avatar, idx) => {
                    return <div className={cls.avatar} key={idx}><img src={getStaticLink(avatar.url)} alt="award" /></div>;
                  })}
                </div>
              </div>
            </div>
            <div className={cls.progressWrapper}>
              <div className={cls.progress} style={{ height: `${(achievement as Achievement & {progress: number}).progress}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};