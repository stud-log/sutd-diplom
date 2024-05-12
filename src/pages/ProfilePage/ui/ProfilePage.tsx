import { FC, useMemo, useState } from 'react';
import { Segmented, Tabs } from 'antd';

import { Button } from 'shared/ui/Button';
import { EditProfile } from 'features/Profile/EditProfile/EditProfile';
import { FavoriteTab } from '../tabs/FavoriteTab/FavoriteTab';
import { Layout } from 'shared/ui/Layout';
import { ProfileTab } from '../tabs/ProfileTab/ProfileTab';
import { Schedule } from 'widgets/Schedule';
import type { TabsProps } from 'antd';
import { TodoTab } from '../tabs/TodoTab/TodoTab';
import { TrophyButton } from 'features/TrophyButton';
import { addAndEditCustomTodoActions } from 'widgets/Modals/ProfileModals/AddAndEditCustomTodo/slice';
import cls from './ProfilePage.module.scss';
import { useDispatch } from 'react-redux';
import userService from 'services/user.service';
import { withWidget } from 'shared/hooks/withWidget';

enum TabsItemsKeys { profile = 'profile', favorite = 'favorite', todo = 'todo'}
const TabsItems: TabsProps['items'] = [ { key: TabsItemsKeys.profile, label: 'Профиль' }, { key: TabsItemsKeys.favorite, label: 'Избранное', }, { key: TabsItemsKeys.todo, label: 'To do' } ];

const ProfilePage: FC = () => {
  const [ activeTab, setActiveTab ] = useState<TabsItemsKeys>(TabsItemsKeys.profile);
  const [ favoriteTable, setFavoriteTable ] = useState<'Домашка' | 'Новости'>('Домашка');
  const dispatch = useDispatch();

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case TabsItemsKeys.profile:
        return <ProfileTab />;
      case TabsItemsKeys.favorite:
        return <FavoriteTab favoriteTable={favoriteTable}/>;
      case TabsItemsKeys.todo:
        return <TodoTab />;
      default:
        return <ProfileTab />;
    }
  }, [ activeTab, favoriteTable ]);
  return (
    <Layout.Base className={cls.SchedulePage}>
      <Layout.BaseHeader slots={{
        start: <Tabs type='line' activeKey={activeTab} className='profile-tabs' items={TabsItems} onChange={(v) => setActiveTab(v as TabsItemsKeys)} />,
        end: <>
          {activeTab == TabsItemsKeys.profile && <TrophyButton />}
          {activeTab == TabsItemsKeys.profile && <EditProfile />}
          {activeTab == TabsItemsKeys.todo && <Button purpose='add' size='md' outline onClick={() => {dispatch(addAndEditCustomTodoActions.openModal({ recordId: -1 }));}}>Своя задача</Button>}
          {activeTab == TabsItemsKeys.favorite && <Segmented defaultValue="Домашка" className='mySegmented' onChange={(value: 'Домашка' | 'Новости') => setFavoriteTable(value)} options={[ 'Домашка', 'Новости' ]}
          />}
        </>
      }} className={cls.header}/>
      <Layout.StickyContent>
        {renderTab}
      </Layout.StickyContent>
    </Layout.Base>
  );
};

export default withWidget(ProfilePage, [ Schedule ]);