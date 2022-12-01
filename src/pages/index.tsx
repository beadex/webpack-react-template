import { FC, lazy, ReactElement, Suspense } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const Detail = lazy(() => import('./Detail'));

const AppShell: FC = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

const Pages: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route
          index
          element={
            <Suspense fallback={<div />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="create"
          element={
            <Suspense fallback={<div />}>
              <Detail type="create" />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default Pages;
