import i18n from './i18n';

export const validateEmail = (email) => {
  if (!email) return i18n.t('auth.emailRequired');
  if (!/^\S+@\S+\.\S+$/.test(email)) return i18n.t('auth.emailInvalid');
  return '';
};

// Keep in sync with the Cognito user pool password policy.
export const validatePassword = (password) => {
  if (!password) return i18n.t('auth.passwordRequired');
  if (password.length < 6) return i18n.t('auth.passwordMin');
  if (!/[A-Z]/.test(password)) return i18n.t('auth.passwordUpper');
  if (!/[^A-Za-z0-9]/.test(password)) return i18n.t('auth.passwordSpecial');
  if (!/[0-9]/.test(password)) return i18n.t('auth.passwordNumber');
  return '';
};

// Only same-app paths, never `//evil.com` (open redirect).
export const safeRedirect = (path, fallback) =>
  typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')
    ? path
    : fallback;
