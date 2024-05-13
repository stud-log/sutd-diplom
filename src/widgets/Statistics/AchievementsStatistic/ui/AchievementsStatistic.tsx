import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { FC } from 'react';
import { User } from '@stud-log/news-types/models';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import cls from './AchievementsStatistic.module.scss';
import { getStaticLink } from 'shared/lib/helpers/getStaticLink';
import { truncate } from 'shared/lib/helpers/truncateWords';

interface AchievementsStatisticProps {
  className?: string;
}

export const AchievementsStatistic: FC<AchievementsStatisticProps> = ({ className }) => {

  const {
    data: user,
    error,
    mutate,
  }: SWRResponse<User> = useSWR(`/api/users/me`, $apiGet);
      
  return (
    <div className={classNames(cls.AchievementsStatistic, {}, [ className ])}>
      {user && <div className={cls.wrapper}>
        <div className={cls.header}>Последние <br /> достижения</div>
        <div className={cls.description}>
          Позже тут сформируется статистика за месяц
        </div>
        <div className={cls.achievementsWrapper}>
          {user.achievements.flatMap(achieve => achieve.achievement).slice(0, 5).map(achievement => {
            return <div className={cls.achievement} key={achievement.id}>
              <div className={cls.image}>
                <img src={getStaticLink(achievement.imgSrc)} alt="image" />
              </div>
              <div className={cls.rightCol}>
                <div className={cls.top}>
                  <div className={cls.title}>{achievement.title}</div>
                  <div className={cls.description}>{truncate.apply(achievement.description, [ 25, false ])}</div>
                </div>
              </div>
            </div>;
          })}
        </div>
      </div>}
    </div>
  );
};