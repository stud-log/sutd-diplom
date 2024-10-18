import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from '@/shared/http/helpers/apiGet';
import { AchievementsList } from '../components/AchievementsList/AchievementsList';
import { Button } from '@/shared/ui/Button';
import { FC } from 'react';
import { Layout } from '@/shared/ui/Layout';
import { Schedule } from '@/widgets/Schedule';
import { User } from '@stud-log/news-types/models';
import cls from './AchievementsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { withWidget } from '@/shared/hooks/withWidget';

const AchievementsPage: FC = () => {
  const navigate = useNavigate();
  
  const {
    data: user,
    error,
    mutate,
  }: SWRResponse<User> = useSWR(`/api/users/me`, $apiGet);

  return (
    <Layout.Sticky>
      <Layout.StickyHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
      }} />
      <Layout.StickyContent className={cls.onMobileContent}>
        {user && <>
          <div className={cls.header}>Достижения</div>
          <div className={cls.wrapper}>
            <AchievementsList receivedAchievements={user.achievements.flatMap(achieve => achieve.achievement)}/>
          </div>
        </>
        }
        
      </Layout.StickyContent>
    </Layout.Sticky>
  );
};

export default withWidget(AchievementsPage, [ Schedule ]);