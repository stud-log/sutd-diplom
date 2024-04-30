import { FC, useMemo, useState } from 'react';

import { EditProfile } from 'features/Profile/EditProfile/EditProfile';
import { FavoriteTab } from '../tabs/FavoriteTab/FavoriteTab';
import { Layout } from 'shared/ui/Layout';
import { ProfileTab } from '../tabs/ProfileTab/ProfileTab';
import { Schedule } from 'widgets/Schedule';
import { SubjectFilter } from 'features/SubjectFilter';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import cls from './ProfilePage.module.scss';
import { withWidget } from 'shared/hooks/withWidget';

enum TabsItemsKeys { profile = 'profile', favorite = 'favorite', todo = 'todo'}
const TabsItems: TabsProps['items'] = [ { key: TabsItemsKeys.profile, label: 'Профиль' }, { key: TabsItemsKeys.favorite, label: 'Избранное', }, { key: TabsItemsKeys.todo, label: 'To do' } ];

const ProfilePage: FC = () => {
  const [ activeTab, setActiveTab ] = useState<TabsItemsKeys>(TabsItemsKeys.profile);
  const renderTab = useMemo(() => {
    switch (activeTab) {
      case TabsItemsKeys.profile:
        return <ProfileTab />;
      case TabsItemsKeys.favorite:
        return <FavoriteTab />;
      default:
        return <ProfileTab />;
    }
  }, [ activeTab ]);
  return (
    <Layout.Base className={cls.SchedulePage}>
      <Layout.BaseHeader slots={{
        start: <Tabs type='line' activeKey={activeTab} className='profile-tabs' items={TabsItems} onChange={(v) => setActiveTab(v as TabsItemsKeys)} />,
        end: <EditProfile />
      }} className={cls.header}/>
      <Layout.BaseContent>
        {renderTab}
      </Layout.BaseContent>
    </Layout.Base>
  );
};

export default withWidget(ProfilePage, [ Schedule ]);