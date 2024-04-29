import { FC, useEffect, useState } from 'react';

import { AddAndEditModal } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { AppLoader } from 'shared/ui/AppLoader/AppLoader';
import { AppRouter } from './providers/router/AppRouter';
import { Layout } from 'shared/ui/Layout';
import { ScheduleModal } from 'widgets/Modals/ProfileModals/ScheduleModal';
import { Sidebar } from 'widgets/Sidebar';
import userService from 'services/user.service';

export const App: FC = () => {
  const [ isReady, setIsReady ] = useState(false);
  useEffect(() => {
    const setup = async () => {
      await userService.checkAuth(); // will redirect on login page if not authenticated
      setIsReady(true);
    };

    setup();
  }, []);

  if(!isReady) return <AppLoader />;
  return (
    <>
      <div className='root'>
        <Layout.App>
          <Sidebar />
          <AppRouter />
          {/* Right sidebar (widgets) incoming with pages using `withWidget` hook */}
        </Layout.App>
      </div>
      <AddAndEditModal />
      <ScheduleModal />
    </>
  );
};