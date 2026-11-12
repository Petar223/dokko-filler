import { Amplify } from 'aws-amplify';
import {
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
} from 'aws-amplify/auth';

const redirectUrls = (process.env.REACT_APP_COGNITO_REDIRECT_URLS || '')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean);

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      loginWith: {
        email: true,
        ...(redirectUrls.length && {
          oauth: {
            domain: process.env.REACT_APP_COGNITO_DOMAIN,
            scopes: [
              'openid',
              'email',
              'profile',
              'aws.cognito.signin.user.admin',
            ],
            redirectSignIn: redirectUrls,
            redirectSignOut: redirectUrls,
            responseType: 'code',
          },
        }),
      },
    },
  },
});

export const signInUser = (email, password) =>
  signIn({ username: email, password });

export const signUpUser = (email, password) =>
  signUp({
    username: email,
    password,
    options: { userAttributes: { email } },
  });

export const confirmSignUpUser = (email, code) =>
  confirmSignUp({ username: email, confirmationCode: code });

export const resendCode = (email) => resendSignUpCode({ username: email });

export const signOutUser = () => signOut();

// Returns null when nobody is signed in.
export const getIdToken = async () => {
  try {
    const session = await fetchAuthSession();
    return session.tokens?.idToken?.toString() ?? null;
  } catch {
    return null;
  }
};

// `signInDetails` is missing after a page refresh, so fall back to username.
export const getCurrentUserEmail = async () => {
  try {
    const user = await getCurrentUser();
    return user.signInDetails?.loginId ?? user.username;
  } catch {
    return null;
  }
};
