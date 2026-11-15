import axios from 'axios';
import i18n from '~utils/i18n';

const readerClient = axios.create({
  baseURL: process.env.READER_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// No `error.response` means the local reader service is not running.
export const toReaderError = (error) =>
  Object.assign(
    new Error(
      error.response ? i18n.t('reader.readFailed') : i18n.t('reader.offline')
    ),
    { status: error.response?.status ?? 0, cause: error }
  );

readerClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toReaderError(error))
);

export default readerClient;
