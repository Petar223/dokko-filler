import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DemoPage from './DemoPage';
import { renderWithProviders } from '../../../test/renderWithProviders';

beforeEach(() => localStorage.clear());

it('opening a contract during the list tour counts as seeing the tour', async () => {
  renderWithProviders(<DemoPage />);
  await screen.findByText('Demo režim');

  // The tour itself says "click the contract".
  await userEvent.click(
    screen.getByRole('button', { name: /Demo ugovor o kupoprodaji vozila/ })
  );
  expect(localStorage.getItem('dokko-tour:demo-list')).toBe('1');
});

it('offers a way to the real contracts from inside the demo', async () => {
  localStorage.setItem('dokko-tour:demo-list', '1');
  localStorage.setItem('dokko-tour:demoWorkspace', '1');
  renderWithProviders(<DemoPage />);
  await userEvent.click(
    screen.getByRole('button', { name: /Demo ugovor o kupoprodaji vozila/ })
  );
  expect(
    await screen.findByRole('link', { name: 'Idi na ugovore' })
  ).toHaveAttribute('href', '/documents');
});
