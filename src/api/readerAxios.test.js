import i18n from '~utils/i18n';
import { toReaderError } from './readerAxios';

it('reports an offline reader when there is no response (B7)', () => {
  const error = toReaderError({ request: {}, message: 'Network Error' });
  expect(error.message).toBe(i18n.t('reader.offline'));
  expect(error.status).toBe(0);
});

it('reports a failed read for HTTP errors', () => {
  expect(toReaderError({ response: { status: 404 } }).message).toBe(
    i18n.t('reader.readFailed')
  );
});
