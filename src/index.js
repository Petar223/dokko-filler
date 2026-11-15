import '@fontsource-variable/inter';
import '~utils/i18n';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from '~components/ErrorBoundary/ErrorBoundary';
import Root from '~components/Root/Root';
import ThemeProvider from '~components/ThemeProvider/ThemeProvider';
import { AuthProvider } from '~context/AuthContext';
import { NotificationProvider } from '~context/NotificationContext';
import GlobalStyle from './GlobalStyle/GlobalSyile';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <ErrorBoundary>
        <AuthProvider>
          <NotificationProvider>
            <Root />
          </NotificationProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  </StrictMode>
);
