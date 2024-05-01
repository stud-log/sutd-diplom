import { FC, useEffect, useState } from 'react';

import { AddAndEditModal } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { AppLoader } from 'shared/ui/AppLoader/AppLoader';
import { AppRouter } from './providers/router/AppRouter';
import { GuideModal } from 'widgets/Modals/GuideModal';
import { HomeworkTaskModal } from 'widgets/Modals/HomeworkTaskModal';
import { Layout } from 'shared/ui/Layout';
import { ManageGroupModal } from 'widgets/Modals/ProfileModals/ManageGroupModal';
import { ScheduleModal } from 'widgets/Modals/ProfileModals/ScheduleModal';
import { Sidebar } from 'widgets/Sidebar';
import { guideModalActions } from 'widgets/Modals/GuideModal/slice';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';

export const App: FC = () => {
  const [ isReady, setIsReady ] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const setup = async () => {
      const logged = await userService.checkAuth(); // will redirect on login page if not authenticated
      if(logged == true) {
        userService.subscribeOnServerEvents();
        const isGuideSeen = await userService.isGuideSeen();
        if(!isGuideSeen) {
          //user cannot use app until watching the guide
          dispatch(guideModalActions.openModal());
        }
      }
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
      <GuideModal />
      <ManageGroupModal />
      <HomeworkTaskModal />
    </>
  );
};