import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAsync } from 'docx-preview';
import { downloadBlob } from '~utils/fileDownloader';
import DocumentModal from './DocumentModal';
import { renderWithProviders } from '../../../test/renderWithProviders';

jest.mock('docx-preview', () => ({
  renderAsync: jest.fn(async (blob, body) => {
    body.innerHTML =
      '<section class="docx">1</section><section class="docx">2</section>';
  }),
}));
jest.mock('~utils/fileDownloader', () => ({ downloadBlob: jest.fn() }));

const preview = new Blob(['preview']);
const clean = new Blob(['clean']);

const setup = async (props) => {
  renderWithProviders(
    <DocumentModal
      open
      onClose={jest.fn()}
      title="Ugovor"
      previewBlob={preview}
      downloadBlob={clean}
      {...props}
    />
  );
  // Wait for the async docx render to settle.
  await screen.findByText('2 stranice');
};

it('renders pages and shows the page count', async () => {
  await setup();
  expect(await screen.findByText('2 stranice')).toBeInTheDocument();
  expect(renderAsync).toHaveBeenCalledWith(
    preview,
    expect.any(HTMLElement),
    expect.any(HTMLElement),
    expect.objectContaining({ breakPages: true })
  );
});

it('zooms in and out', async () => {
  await setup();
  await userEvent.click(screen.getByRole('button', { name: 'Uvećaj' }));
  expect(screen.getByText('110%')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Umanji' }));
  await userEvent.click(screen.getByRole('button', { name: 'Umanji' }));
  expect(screen.getByText('90%')).toBeInTheDocument();
});

it('downloads the clean (non-highlighted) document', async () => {
  await setup();
  await userEvent.click(screen.getByRole('button', { name: /Preuzmi .docx/ }));
  expect(downloadBlob).toHaveBeenCalledWith(clean, 'Ugovor.docx');
});

it('switches to the clean blob when highlighting is turned off', async () => {
  await setup();
  await userEvent.click(
    screen.getByRole('checkbox', { name: 'Označi popunjena polja' })
  );
  await waitFor(() =>
    expect(renderAsync).toHaveBeenLastCalledWith(
      clean,
      expect.anything(),
      expect.anything(),
      expect.anything()
    )
  );
});

it('lists missing fields', async () => {
  await setup({ missingFields: ['name_2', 'date'] });
  expect(
    screen.getByText(/2 polja nije popunjeno: name_2, date/)
  ).toBeInTheDocument();
});
