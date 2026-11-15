import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useNotification } from '~context/NotificationContext';
import PasswordField from '~shared-components/PasswordField/PasswordField';
import { signUpUser } from '~utils/cognitoAuth';
import { ROUTES } from '~utils/routes';
import { validateEmail, validatePassword } from '~utils/validation';
import AuthCard from './AuthCard';

const Signup = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const field = (name) => ({
    value: form[name],
    onChange: (e) => setForm((f) => ({ ...f, [name]: e.target.value })),
    error: !!errors[name],
    helperText: errors[name],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirm: !form.confirm
        ? t('auth.confirmPasswordRequired')
        : form.confirm !== form.password
          ? t('auth.passwordsMismatch')
          : '',
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const { nextStep } = await signUpUser(form.email, form.password);
      if (nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
        notify(t('auth.signupSuccess'), 'success');
        navigate(
          `${ROUTES.CONFIRM_SIGNUP}?email=${encodeURIComponent(form.email)}`
        );
      } else {
        notify(t('auth.confirmSuccess'), 'success');
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      notify(
        error.name === 'UsernameExistsException'
          ? t('auth.userExists')
          : t('auth.signupFailed'),
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title={t('auth.signupTitle')}
      subtitle={t('auth.signupSubtitle')}
      onSubmit={handleSubmit}
      footer={
        <>
          {t('auth.haveAccount')}{' '}
          <Link component={RouterLink} to={ROUTES.LOGIN}>
            {t('auth.loginLink')}
          </Link>
        </>
      }
    >
      <TextField
        label={t('auth.email')}
        type="email"
        autoComplete="email"
        {...field('email')}
      />
      <PasswordField
        label={t('auth.password')}
        autoComplete="new-password"
        {...field('password')}
      />
      <PasswordField
        label={t('auth.confirmPassword')}
        autoComplete="new-password"
        {...field('confirm')}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          t('auth.signupSubmit')
        )}
      </Button>
    </AuthCard>
  );
};

export default Signup;
