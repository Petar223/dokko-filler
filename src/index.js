import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from '~app/GlobalStyle';
import ErrorBoundary from '~app/ErrorBoundary/ErrorBoundary';
import Root from '~app/Root';
import ThemeProvider from '~theme/ThemeProvider';
import { AuthProvider } from '~features/auth/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <GlobalStyle />
          <Root />
        </ErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
