import React from 'react';
import styled from 'styled-components';
import Footer from '~app/Footer/Footer';
import Header from '~app/Header/Header';
import Sidebar from '~app/Sidebar/Sidebar';
import { NotificationProvider } from '~app/NotificationContext';

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
    <NotificationProvider>
      <FlexContainer>
        <Header />
        <MainContent>
          <Sidebar />
          <Content>{children}</Content>
        </MainContent>
        <Footer />
      </FlexContainer>
    </NotificationProvider>
  );
}

export default Layout;
