import axiosInstance from './axios';

// Inflects `noun` to the grammatical case `p1`..`p7` and returns the result.
// CASE_API_KEY is visible in the bundle, so it is not a secret; drop it once
// /case accepts the Cognito token that axios.js already sends.
const postPlaceholder = async ({ noun, case: grammaticalCase }) => {
  const response = await axiosInstance.post('/case', {
    noun,
    case: grammaticalCase,
    apikey: process.env.CASE_API_KEY,
  });
  return response.data.body;
};

export default postPlaceholder;
