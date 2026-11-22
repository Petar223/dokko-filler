import { screen } from '@testing-library/react';
import DocumentWorkspace from './DocumentWorkspace';
import { renderWithProviders } from '../../../test/renderWithProviders';

beforeEach(() => localStorage.clear());

it('skips the card step of the tour when the contract needs no cards', async () => {
  renderWithProviders(
    <DocumentWorkspace
      title="Ugovor"
      neededCards={[]}
      templateURL="/x.docx"
      readFn={jest.fn()}
      onBack={jest.fn()}
    />
  );
  expect(await screen.findByText('Napredak')).toBeInTheDocument();
  expect(screen.getByText('1 od 3')).toBeInTheDocument();
});
