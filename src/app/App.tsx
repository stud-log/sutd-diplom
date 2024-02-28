import './styles/index.scss';

import { AppRouter } from './providers/router/AppRouter';
import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';
import { Sidebar } from 'widgets/Sidebar';

export const App: FC = () => {
  
  return (
    <div className='root'>
      <Layout.App>
        <Sidebar />
        <AppRouter />
        {/* Right sidebar (widgets) incoming with pages using `withWidget` hook */}
      </Layout.App>
    </div>
  );
};