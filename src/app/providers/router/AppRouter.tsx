import { FC, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from 'shared/config/routes';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';



export const AppRouter: FC = () => {

  return (
    <div> 
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {routes.map((route, idx) => {
            return route.element && <Route key={idx} path={route.path} element={<route.element />} />;
          })}
          <Route path="/" element={<Navigate to="/main" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
}