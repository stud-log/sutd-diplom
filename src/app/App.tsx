
import { AppRouter } from './providers/router/AppRouter';
import './styles/index.scss'
import { FC } from 'react';


export const App: FC = () => {

  return (
    <div className='root'>
      <AppRouter />
    </div>
  );
}