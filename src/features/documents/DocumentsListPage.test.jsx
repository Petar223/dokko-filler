import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getDocuments } from '~api/documents';
import { MSG } from '~constants/messages';
import DocumentsListPage from './DocumentsListPage';
import { renderWithProviders } from '../../../test/renderWithProviders';

jest.mock('~api/documents', () => ({ getDocuments: jest.fn() }));

it('shows a skeleton while loading, then the list', async () => {
  getDocuments.mockResolvedValue({
    body: [{ id: 'a/b', name: 'Ugovor / kupoprodaja #1' }],
  });
  renderWithProviders(<DocumentsListPage />);
  expect(screen.getByLabelText('Učitavanje')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: /Ugovor \/ kupoprodaja #1/ })
  ).toBeInTheDocument();
});

it('shows the empty state', async () => {
  getDocuments.mockResolvedValue({ body: [] });
  renderWithProviders(<DocumentsListPage />);
  expect(await screen.findByText(MSG.documents.listEmpty)).toBeInTheDocument();
});

it('shows an error with retry', async () => {
  getDocuments.mockRejectedValueOnce(new Error('Server ne odgovara.'));
  getDocuments.mockResolvedValueOnce({ body: [{ id: 1, name: 'Ugovor' }] });
  renderWithProviders(<DocumentsListPage />);

  expect(await screen.findByText(MSG.documents.listFailed)).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Pokušaj ponovo' }));
  expect(
    await screen.findByRole('button', { name: /Ugovor/ })
  ).toBeInTheDocument();
});
