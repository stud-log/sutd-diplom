import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/animations/shift-toward.css';
import './app/styles/index.scss';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AddAndEditModal } from 'widgets/Modals/ProfileModals/AddAndEditModal';
import { AntdConfigProvider } from 'app/providers/AntdConfigProvider';
import { App } from 'app/App';
import LoginPage from 'pages/LoginPage';
import Page404 from 'pages/404Page/ui/404Page';
import ReactDOM from 'react-dom/client';
import RecoveryPage from 'pages/RecoveryPage/';
import { ReduxProvider } from 'app/providers/ReduxProvider';
import RegistrationPage from 'pages/RegistrationPage';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReduxProvider>
    <AntdConfigProvider >
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>} />
          <Route path='/reg' element={<RegistrationPage/>} />
          <Route path='/recovery' element={<RecoveryPage/>} />
          <Route path='/*' element={ <App />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AntdConfigProvider>
  </ReduxProvider>
);

