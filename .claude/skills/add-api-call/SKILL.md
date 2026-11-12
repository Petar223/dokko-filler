---
name: add-api-call
description: Add a new backend or card-reader endpoint call to Dokko Filler (pick httpClient vs readerClient, domain module in src/api, useFetch or action hook, Serbian error messages, mocks for tests and demo). Use when the app must call a new endpoint.
---

# Add an API call

1. **Pick the client**
   - Backend (`API_BASE_URL`, Cognito token attached, 401 → logout) → `~api/httpClient`.
   - Local card reader (`READER_API_BASE_URL`, no auth) → `~api/readerClient`.
   - New base URL → add the variable to `PUBLIC_ENV` in `webpack.config.js`,
     `.env-cmdrc.example` and the table in `README.md`. Never put secrets in it:
     everything in `PUBLIC_ENV` is public.
2. **Domain module** `src/api/<domain>.js` (add to the existing file for that
   domain):
   ```js
   export const getThing = async (id) =>
     (await httpClient.get('/thing', { params: { id } })).data;
   ```
   - Use `params` for query strings (encoding is handled for you).
   - Return data, not the axios response. No UI code here.
3. **Errors**: clients already reject with an `Error` whose `message` is
   Serbian (`MSG.http.*`, `MSG.reader.*`). If the endpoint needs a specific
   message, add it to `src/constants/messages.js`.
4. **Use it**
   - Data for a page → `useFetch(useCallback(() => getThing(id), [id]))`,
     render `loading` / `error` (+ `refetch`) / empty / success.
   - User action → `async` handler or a feature hook. Show failures with
     `notify(error.message, 'error')` from `useNotification()`.
5. **Tests**: `jest.mock('~api/<domain>', () => ({ getThing: jest.fn() }))`
   in component tests. For new error mapping, unit test the mapper (see
   `api/readerClient.test.js`).
6. **Demo**: if the call is part of the contract flow, make sure `/demo` still
   works without it (mock it like `mockReadCard` in
   `src/features/demo/demoData.js`).
7. Run `verify-change`.
