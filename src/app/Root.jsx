import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '~app/Layout/Layout';
import PrivateRoute from './PrivateRoute';
import Loading from '~ui/Loading';

const Login = lazy(() => import('~features/auth/LoginPage'));
const Signup = lazy(() => import('~features/auth/SignupPage'));
const AboutPage = lazy(() => import('~features/static/AboutPage'));
const DocumentsList = lazy(
  () => import('~features/documents/DocumentsListPage')
);
const GenerateDocumentPage = lazy(
  () => import('~features/generate/GenerateDocumentPage')
);
const HomePage = lazy(() => import('~features/static/HomePage'));
const DemoPage = lazy(() => import('~features/demo/DemoPage'));
const PageNotFound = lazy(() => import('~features/static/NotFoundPage'));

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

function Root() {
  return (
    <Router>
      <Layout>
        <Suspense
          fallback={
            <Container>
              <Loading />
            </Container>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <Container>
                  <Login />
                </Container>
              }
            />
            <Route
              path="/signup"
              element={
                <Container>
                  <Signup />
                </Container>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/demo" element={<DemoPage />} />

            <Route element={<PrivateRoute />}>
              <Route path="/documents" element={<DocumentsList />} />
              <Route
                path="/documents/create/:name/:id"
                element={<GenerateDocumentPage />}
              />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default Root;
