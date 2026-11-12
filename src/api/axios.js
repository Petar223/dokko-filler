import axios from 'axios';
import { getIdToken, signOutUser } from '~utils/cognitoAuth';
import { MSG } from '~utils/messages';
import { ROUTES } from '~utils/routes';

const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getIdToken();
  if (token) config.headers.Authorization = token;
  return config;
});

export const toHttpError = (error) => {
  const status = error.response?.status;
  let message = MSG.http.setup;
  if (status) message = MSG.http[status] ?? MSG.http.unknown(status);
  else if (error.request) message = MSG.http.noResponse;
  return Object.assign(new Error(message), { status, cause: error });
};

const redirectToLogin = async () => {
  await signOutUser().catch(() => {});
  const from = window.location.pathname + window.location.search;
  window.location.assign(`${ROUTES.LOGIN}?from=${encodeURIComponent(from)}`);
};

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== ROUTES.LOGIN
    ) {
      redirectToLogin();
    }
    return Promise.reject(toHttpError(error));
  }
);

export default httpClient;
