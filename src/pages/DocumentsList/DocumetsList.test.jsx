import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDocuments from '~api/getDocuments';
import i18n from '~utils/i18n';
import DocumentsList from './DocumetsList';
import { renderWithProviders } from '../../../test/renderWithProviders';

jest.mock('~api/getDocuments', () => jest.fn());

it('shows a skeleton while loading, then the list', async () => {
  getDocuments.mockResolvedValue({
    body: [{ id: 'a/b', name: 'Ugovor / kupoprodaja #1' }],
  });
  renderWithProviders(<DocumentsList />);
  expect(screen.getByLabelText('Učitavanje')).toBeInTheDocument();
  expect(
    await screen.findByRole('button', { name: /Ugovor \/ kupoprodaja #1/ })
  ).toBeInTheDocument();
});

it('shows the empty state', async () => {
  getDocuments.mockResolvedValue({ body: [] });
  renderWithProviders(<DocumentsList />);
  expect(
    await screen.findByText(i18n.t('documents.listEmpty'))
  ).toBeInTheDocument();
});

it('shows an error with retry', async () => {
  getDocuments.mockRejectedValueOnce(new Error('Server ne odgovara.'));
  getDocuments.mockResolvedValueOnce({ body: [{ id: 1, name: 'Ugovor' }] });
  renderWithProviders(<DocumentsList />);

  expect(
    await screen.findByText(i18n.t('documents.listFailed'))
  ).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Pokušaj ponovo' }));
  expect(
    await screen.findByRole('button', { name: /Ugovor/ })
  ).toBeInTheDocument();
});

describe('tour', () => {
  beforeEach(() => localStorage.clear());

  it('points at the first contract on the first visit', async () => {
    getDocuments.mockResolvedValue({ body: [{ id: 1, name: 'Ugovor' }] });
    renderWithProviders(<DocumentsList />);
    expect(await screen.findByText('Izaberite ugovor')).toBeInTheDocument();
    expect(screen.getByText('1 od 2')).toBeInTheDocument();
  });

  it('does not start on an empty list', async () => {
    getDocuments.mockResolvedValue({ body: [] });
    renderWithProviders(<DocumentsList />);
    await screen.findByText(i18n.t('documents.listEmpty'));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});

it('opening a contract during the tour counts as seeing the tour', async () => {
  localStorage.clear();
  getDocuments.mockResolvedValue({ body: [{ id: 1, name: 'Ugovor' }] });
  renderWithProviders(<DocumentsList />);
  await screen.findByText('Izaberite ugovor');
  await userEvent.click(screen.getByRole('button', { name: /^Ugovor/ }));
  expect(localStorage.getItem('dokko-tour:documents')).toBe('1');
});
