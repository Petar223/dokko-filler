import { act, render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';
import { getCurrentUserEmail, signOutUser } from './authService';

jest.mock('./authService', () => ({
  getCurrentUserEmail: jest.fn(),
  signOutUser: jest.fn(),
}));

let auth;
const Probe = () => {
  auth = useAuth();
  return <span>{auth.user ?? 'anon'}</span>;
};

it('shows the user again after logout -> login without refresh (B8)', async () => {
  getCurrentUserEmail.mockResolvedValue('a@b.rs');
  render(
    <AuthProvider>
      <Probe />
    </AuthProvider>
  );
  expect(await screen.findByText('a@b.rs')).toBeInTheDocument();

  signOutUser.mockResolvedValue();
  await act(() => auth.logout());
  expect(screen.getByText('anon')).toBeInTheDocument();

  getCurrentUserEmail.mockResolvedValue('a@b.rs');
  await act(() => auth.login());
  await waitFor(() => expect(screen.getByText('a@b.rs')).toBeInTheDocument());
  expect(auth.status).toBe('authenticated');
});
