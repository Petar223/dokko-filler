import axios from 'axios';
import { MSG } from '~constants/messages';

const readerClient = axios.create({
  baseURL: process.env.READER_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// No `error.response` means the local reader service is not running.
export const toReaderError = (error) =>
  Object.assign(
    new Error(error.response ? MSG.reader.readFailed : MSG.reader.offline),
    { status: error.response?.status ?? 0, cause: error }
  );

readerClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(toReaderError(error))
);

export default readerClient;
