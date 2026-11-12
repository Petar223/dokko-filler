import { MSG } from '~constants/messages';
import { toReaderError } from './readerClient';

it('reports an offline reader when there is no response (B7)', () => {
  const error = toReaderError({ request: {}, message: 'Network Error' });
  expect(error.message).toBe(MSG.reader.offline);
  expect(error.status).toBe(0);
});

it('reports a failed read for HTTP errors', () => {
  expect(toReaderError({ response: { status: 404 } }).message).toBe(
    MSG.reader.readFailed
  );
});
