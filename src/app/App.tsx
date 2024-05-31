import { FC, useEffect, useState } from 'react';

import { AddAndEditCustomTodo } from 'widgets/Modals/ProfileModals/AddAndEditCustomTodo';
import { AddAndEditModal } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import AppHistory from 'shared/config/history';
import { AppLoader } from 'shared/ui/AppLoader/AppLoader';
import { AppRouter } from './providers/router/AppRouter';
import { GuideModal } from 'widgets/Modals/GuideModal';
import { HomeworkTaskModal } from 'widgets/Modals/HomeworkTaskModal';
import { Layout } from 'shared/ui/Layout';
import { ManageGroupModal } from 'widgets/Modals/ProfileModals/ManageGroupModal';
import { MobileHeader } from 'widgets/MobileHeader';
import { MobileMenu } from 'widgets/MobileMenu';
import { ScheduleModal } from 'widgets/Modals/ProfileModals/ScheduleModal';
import { Sidebar } from 'widgets/Sidebar';
import { guideModalActions } from 'widgets/Modals/GuideModal/slice';
import socketService from 'services/socket.service'; // here we already initialized socket
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userService from 'services/user.service';
import { AddAndEditCustomActivity } from 'widgets/Modals/ProfileModals/AddAndEditCustomActivity';
import { CustomActivityModal } from 'widgets/Modals/CustomActivityModal';

export const App: FC = () => {
  const [ isReady, setIsReady ] = useState(false);
  const dispatch = useDispatch();
  AppHistory.navigate = useNavigate();
  
  useEffect(() => {
    const setup = async () => {
      const logged = await userService.checkAuth(); // will redirect on login page if not authenticated
      if(logged == true) {
        userService.subscribeOnServerEvents();
        userService.checkUnseenNotifications();
        userService.checkUnseenAchievements();
        
        const isGuideSeen = await userService.isGuideSeen();
        if(!isGuideSeen) {
          //user cannot use app until watching the guide
          dispatch(guideModalActions.openModal());
        }
      }
      setIsReady(true);
    };

    setup();

    return () => {
      socketService.getSocket()?.disconnect();
    };
  }, []);

  if(!isReady) return <AppLoader />;
  return (
    <>
      
      <div className='root'>
        <MobileHeader />
        <Layout.App>
          <Sidebar />
          <AppRouter />
          {/* Right sidebar (widgets) incoming with pages using `withWidget` hook */}
          <MobileMenu />
        </Layout.App>
        
      </div>
      <AddAndEditModal />
      <ScheduleModal />
      <GuideModal />
      <ManageGroupModal />
      <HomeworkTaskModal />
      <AddAndEditCustomTodo />
      <AddAndEditCustomActivity />
      <CustomActivityModal />
      
    </>
  );
};