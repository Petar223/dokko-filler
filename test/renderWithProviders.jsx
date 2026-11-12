import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ThemeProvider from '~components/ThemeProvider/ThemeProvider';
import { NotificationProvider } from '~context/NotificationContext';

export const renderWithProviders = (ui, { route = '/' } = {}) =>
  render(
    <ThemeProvider>
      <NotificationProvider>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </NotificationProvider>
    </ThemeProvider>
  );
