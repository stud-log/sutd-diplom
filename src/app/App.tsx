import './styles/index.scss';

import { AppRouter } from './providers/router/AppRouter';
import { FC } from 'react';
import { Layout } from 'shared/ui/Layout';

export const App: FC = () => {
  
  return (
    <div className='root'>
      <Layout>
        <AppRouter />
      </Layout>
    </div>
  );
};