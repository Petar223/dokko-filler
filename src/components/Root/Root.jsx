import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '~components/Layout/Layout';
import PrivateRoute from '~components/PrivateRoute/PrivateRoute';
import Loading from '~shared-components/Loading/Loading';

const Login = lazy(() => import('~components/Authentication/Login'));
const Signup = lazy(() => import('~components/Authentication/Signup'));
const AboutPage = lazy(() => import('~pages/AboutPage/AboutPage'));
const DocumentsList = lazy(() => import('~pages/DocumentsList/DocumetsList'));
const GenerateDocumentPage = lazy(
  () => import('~pages/GenerateDocumentPage/GenerateDocumentPage')
);
const HomePage = lazy(() => import('~pages/HomePage/HomePage'));
const DemoPage = lazy(() => import('~pages/DemoPage/DemoPage'));
const PageNotFound = lazy(() => import('~pages/PageNotFound/PageNotFound'));

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
            <Route path='/' element={<HomePage />} />
            <Route
              path='/login'
              element={
                <Container>
                  <Login />
                </Container>
              }
            />
            <Route
              path='/signup'
              element={
                <Container>
                  <Signup />
                </Container>
              }
            />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/demo' element={<DemoPage />} />

            <Route element={<PrivateRoute />}>
              <Route path='/documents' element={<DocumentsList />} />
              <Route
                path='/documents/create/:name/:id'
                element={<GenerateDocumentPage />}
              />
            </Route>

            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default Root;
