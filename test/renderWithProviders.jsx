import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotificationProvider } from '~app/Notifications';
import ColorModeProvider from '~theme/ColorModeProvider';

export const renderWithProviders = (ui, { route = '/' } = {}) =>
  render(
    <ColorModeProvider>
      <NotificationProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </NotificationProvider>
    </ColorModeProvider>
  );
