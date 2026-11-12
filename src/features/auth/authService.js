import { Amplify } from 'aws-amplify';
import {
  signIn,
  signUp,
  signOut,
  fetchAuthSession,
  getCurrentUser,
} from 'aws-amplify/auth';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: process.env.REACT_APP_COGNITO_CLIENT_ID,
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      loginWith: {
        oauth: {
          domain: process.env.REACT_APP_COGNITO_DOMAIN,
          scopes: ['openid email profile aws.cognito.signin.user.admin'],
          redirectSignIn: ['http://localhost:3000/', 'https://example.com/'],
          redirectSignOut: ['http://localhost:3000/', 'https://example.com/'],
          responseType: 'code',
        },
        username: 'false',
        email: 'true',
        phone: 'false',
      },
    },
  },
});

async function signUpUtil(email, password) {
  return await signUp({
    username: email,
    password,
  });
}

async function signInUtil(email, password) {
  return await signIn({
    username: email,
    password,
  });
}

async function signOutUtil(global = false) {
  return await signOut({ global });
}

async function getIdTokenUtil() {
  try {
    const session = await fetchAuthSession();
    return session.tokens.idToken?.toString();
  } catch (error) {
    throw new Error('Niste prijavljeni.');
  }
}

async function getCurrentUserUtil() {
  try {
    const user = await getCurrentUser();
    return user;
  } catch (error) {
    throw new Error('Nema prijavljenog korisnika.');
  }
}

export {
  signUpUtil,
  signInUtil,
  signOutUtil,
  getIdTokenUtil,
  getCurrentUserUtil,
};
