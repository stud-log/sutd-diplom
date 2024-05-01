import { FC, useMemo, useState } from 'react';
import useSWR, { SWRResponse } from 'swr';

import { $apiGet } from 'shared/http/helpers/apiGet';
import { Button } from 'shared/ui/Button';
import { Layout } from 'shared/ui/Layout';
import { Schedule } from 'widgets/Schedule';
import { User } from '@stud-log/news-types/models';
import cls from './ProfileSettingsPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { withWidget } from 'shared/hooks/withWidget';

const ProfileSettingsPage: FC = () => {
  const navigate = useNavigate();
  const {
    data: user,
    error,
    mutate,
  }: SWRResponse<User> = useSWR(`/api/users/me`, $apiGet);
  return (
    <Layout.Base className={cls.SchedulePage}>
      <Layout.BaseHeader slots={{
        start: <Button outline purpose='back' size='md' onClick={() => navigate(-1)}>Назад</Button>,
        end: <>
            
        </>
      }} />
      <Layout.BaseContent>
        settings
      </Layout.BaseContent>
    </Layout.Base>
  );
};

export default withWidget(ProfileSettingsPage, [ Schedule ]);