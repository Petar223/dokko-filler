import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '~app/Layout/Layout';
import PrivateRoute from '~app/PrivateRoute';
import { ROUTES } from '~constants/routes';
import LoadingState from '~ui/LoadingState';

const LoginPage = lazy(() => import('~features/auth/LoginPage'));
const SignupPage = lazy(() => import('~features/auth/SignupPage'));
const ConfirmSignupPage = lazy(
  () => import('~features/auth/ConfirmSignupPage')
);
const DocumentsListPage = lazy(
  () => import('~features/documents/DocumentsListPage')
);
const GenerateDocumentPage = lazy(
  () => import('~features/generate/GenerateDocumentPage')
);
const DemoPage = lazy(() => import('~features/demo/DemoPage'));
const HomePage = lazy(() => import('~features/static/HomePage'));
const AboutPage = lazy(() => import('~features/static/AboutPage'));
const NotFoundPage = lazy(() => import('~features/static/NotFoundPage'));

const Root = () => (
  <BrowserRouter>
    <Layout>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route path={ROUTES.CONFIRM_SIGNUP} element={<ConfirmSignupPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route path={ROUTES.DEMO} element={<DemoPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={ROUTES.DOCUMENTS} element={<DocumentsListPage />} />
            <Route
              path={ROUTES.CREATE_DOCUMENT}
              element={<GenerateDocumentPage />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  </BrowserRouter>
);

export default Root;
