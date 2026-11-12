import { MSG } from '~constants/messages';

export const validateEmail = (email) => {
  if (!email) return MSG.auth.emailRequired;
  if (!/^\S+@\S+\.\S+$/.test(email)) return MSG.auth.emailInvalid;
  return '';
};

// Keep in sync with the Cognito user pool password policy.
export const validatePassword = (password) => {
  if (!password) return MSG.auth.passwordRequired;
  if (password.length < 6) return 'Lozinka mora imati najmanje 6 karaktera.';
  if (!/[A-Z]/.test(password))
    return 'Lozinka mora sadržati bar jedno veliko slovo.';
  if (!/[^A-Za-z0-9]/.test(password))
    return 'Lozinka mora sadržati bar jedan specijalni karakter.';
  if (!/[0-9]/.test(password)) return 'Lozinka mora sadržati bar jedan broj.';
  return '';
};

// Only same-app paths, never `//evil.com` (open redirect).
export const safeRedirect = (path, fallback) =>
  typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')
    ? path
    : fallback;
