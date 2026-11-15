import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useAuth } from '~context/AuthContext';
import TutorialOffer from './TutorialOffer';
import { renderWithProviders } from '../../../test/renderWithProviders';

jest.mock('~context/AuthContext', () => ({ useAuth: jest.fn() }));

beforeEach(() => localStorage.clear());

it('is not shown to anonymous visitors', () => {
  useAuth.mockReturnValue({ user: null });
  renderWithProviders(<TutorialOffer />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('offers the tutorial on first login and never again after an answer', async () => {
  useAuth.mockReturnValue({ user: 'ana@example.com' });
  const first = renderWithProviders(<TutorialOffer />);
  await userEvent.click(screen.getByRole('button', { name: 'Ne sada' }));
  expect(screen.queryByRole('button', { name: 'Ne sada' })).not.toBeVisible();
  first.unmount();

  renderWithProviders(<TutorialOffer />);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('offers it again to a different user on the same browser', () => {
  localStorage.setItem('dokko-tutorial-offered:ana@example.com', '1');
  useAuth.mockReturnValue({ user: 'marko@example.com' });
  renderWithProviders(<TutorialOffer />);
  expect(
    screen.getByRole('button', { name: 'Pokreni vodič' })
  ).toBeInTheDocument();
});
