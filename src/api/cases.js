import httpClient from './httpClient';

// Inflects `noun` to the grammatical case `p1`..`p7`.
// ponytail: CASE_API_KEY is visible in the bundle, so it is not a secret;
// drop it once /case accepts the Cognito token sent by httpClient.
export const inflect = async ({ noun, case: grammaticalCase }) =>
  (
    await httpClient.post('/case', {
      noun,
      case: grammaticalCase,
      apikey: process.env.CASE_API_KEY,
    })
  ).data.body;
