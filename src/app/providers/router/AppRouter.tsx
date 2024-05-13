import { FC, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Page404 from 'pages/404Page/ui/404Page';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { routes } from 'shared/config/routes';

export const AppRouter: FC = () => {

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map((route, idx) => {
          return route.element && <Route key={idx} path={route.path} element={<route.element />} />;
        })}
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  );
};