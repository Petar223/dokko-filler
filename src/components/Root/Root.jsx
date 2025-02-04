import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "~components/Layout/Layout";
import AboutPage from "~pages/AboutPage/AboutPage";
import DocumentsList from "~pages/DocumentsList/DocumetsList";
import PageNotFound from "~pages/PageNotFound/PageNotFound";
import HomePage from "~pages/HomePage/HomePage";
import GenerateDocumentPage from "~pages/GenerateDocumentPage/GenerateDocumentPage";
import Login from "~components/Authentication/Login";
import Signup from "~components/Authentication/Signup";
import PrivateRoute from "~components/PrivateRoute/PrivateRoute";

function Root() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/documents" element={<DocumentsList />} />
            <Route
              path="/documents/create/:name/:id"
              element={<GenerateDocumentPage />}
            />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Root;
