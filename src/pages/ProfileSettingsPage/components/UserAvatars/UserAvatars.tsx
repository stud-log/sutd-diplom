import { FC, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { Achievement } from '@stud-log/news-types/models';
import LockIcon from '@/shared/assets/img/icons/lock-02.svg?react';
import { Tooltip } from 'antd';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import cls from './UserAvatars.module.scss';
import { getStaticLink } from '@/shared/lib/helpers/getStaticLink';
import userService from '@/services/user.service';

interface UserAvatarsProps {
  className?: string;
  receivedAchievements: Achievement[];
  onChange: (avatarUrl: string, avatarColor: string) => void;
}

export const UserAvatars: FC<UserAvatarsProps> = ({ className, receivedAchievements, onChange }) => {
  const userAvatar = userService.getAvatar();
  const [ choosed, setChoosed ] = useState(userAvatar);
  const {
    data: allAchievements,
    error,
    mutate,
  }: SWRResponse<Achievement[]> = useSWR(`/api/achievements/all`, $apiGet);

  const unReceived = allAchievements?.filter(i => !receivedAchievements.map(i => i.id).includes(i.id));
  
  return (
    <div className={classNames(cls.UserAvatars, {}, [ className ])}>
      <div className={cls.title}>Аватарка</div>
      
      <div className={cls.wrapperAvatars}>
        {receivedAchievements.map( anAchievement => {
          return (anAchievement.trophy.avatars as {url: string; color: string}[]).map((avatar, idx) => {
            return <div className={classNames(cls.availableAvatar, { [cls.choosed]: avatar.url == choosed })} onClick={() => {
              setChoosed(avatar.url);
              onChange(avatar.url, avatar.color);
            }} key={idx}>
              <img src={getStaticLink(avatar.url)} alt="" />
            </div>;
          });
        })}
        {unReceived && unReceived.map( anAchievement => {
          return (anAchievement.trophy.avatars as {url: string; color: string}[]).map((avatar, idx) => {
            return <Tooltip overlayInnerStyle={{ fontSize: 'var(--fz-s)' }} title={`Откройте достижение "${anAchievement.title}"`} color={'var(--attention)'} className={classNames(cls.unavailableAvatar)} key={idx}>
              <img src={getStaticLink(avatar.url)} alt="" />
              <LockIcon className={cls.lock} />
            </Tooltip>;
          });
        })}
      </div>
    
    </div>
  );
};