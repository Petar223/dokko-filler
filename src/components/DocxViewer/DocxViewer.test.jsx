import { screen } from '@testing-library/react';
import { renderAsync } from 'docx-preview';
import Mammoth from 'mammoth';
import DocxViewer from './DocxViewer';
import { renderWithProviders } from '../../../test/renderWithProviders';

jest.mock('docx-preview', () => ({ renderAsync: jest.fn() }));
jest.mock('mammoth', () => ({ convertToHtml: jest.fn() }));

const blob = { arrayBuffer: async () => new ArrayBuffer(0) };

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  renderAsync.mockRejectedValue(new Error('render failed'));
});
afterEach(() => jest.restoreAllMocks());

it('falls back to the simplified preview when docx-preview fails', async () => {
  Mammoth.convertToHtml.mockResolvedValue({ value: '<p>Ugovor tekst</p>' });
  renderWithProviders(<DocxViewer blob={blob} />);
  expect(await screen.findByText('Ugovor tekst')).toBeInTheDocument();
});

it('shows a message instead of spinning forever when the fallback fails too', async () => {
  Mammoth.convertToHtml.mockRejectedValue(new Error('bad file'));
  const onRendered = jest.fn();
  renderWithProviders(<DocxViewer blob={blob} onRendered={onRendered} />);
  expect(await screen.findByText(/Pregled nije dostupan/)).toBeInTheDocument();
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
