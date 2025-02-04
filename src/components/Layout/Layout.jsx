import React from "react";
import styled from "styled-components";
import Header from "~components/Header/Header";
import Footer from "~components/Footer/Footer";
import Sidebar from "~components/Sidebar/Sidebar";
import { NotificationProvider } from "~context/NotificationContext";

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  flex-grow: 1;
  padding: 16px;
  overflow-y: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

function Layout({ children }) {
  return (
    <FlexContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <NotificationProvider>
          <Content>{children}</Content>
        </NotificationProvider>
      </MainContent>
      <Footer />
    </FlexContainer>
  );
}

export default Layout;
