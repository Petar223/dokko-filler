import '@fontsource-variable/inter';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from '~app/ErrorBoundary/ErrorBoundary';
import GlobalStyle from '~app/GlobalStyle';
import { NotificationProvider } from '~app/Notifications';
import Root from '~app/Root';
import { AuthProvider } from '~features/auth/AuthContext';
import ColorModeProvider from '~theme/ColorModeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ColorModeProvider>
      <GlobalStyle />
      <ErrorBoundary>
        <AuthProvider>
          <NotificationProvider>
            <Root />
          </NotificationProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ColorModeProvider>
  </StrictMode>
);
