import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~components/Layout/Layout';
import PrivateRoute from '~components/PrivateRoute/PrivateRoute';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import { ROUTES } from '~utils/routes';

const Login = lazy(() => import('~components/Authentication/Login'));
const Signup = lazy(() => import('~components/Authentication/Signup'));
const ConfirmSignup = lazy(
  () => import('~components/Authentication/ConfirmSignup')
);
const DocumentsList = lazy(() => import('~pages/DocumentsList/DocumetsList'));
const GenerateDocumentPage = lazy(
  () => import('~pages/GenerateDocumentPage/GenerateDocumentPage')
);
const DemoPage = lazy(() => import('~pages/DemoPage/DemoPage'));
const HomePage = lazy(() => import('~pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('~pages/AboutPage/AboutPage'));
const PageNotFound = lazy(() => import('~pages/PageNotFound/PageNotFound'));

const Root = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.CONFIRM_SIGNUP} element={<ConfirmSignup />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.DEMO} element={<DemoPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.DOCUMENTS} element={<DocumentsList />} />
            <Route
              path={ROUTES.CREATE_DOCUMENT}
              element={<GenerateDocumentPage />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default Root;
