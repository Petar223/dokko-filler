import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useNotification } from '~app/Notifications';
import { MSG } from '~constants/messages';
import { ROUTES } from '~constants/routes';
import PasswordField from '~ui/PasswordField';
import AuthCard from './AuthCard';
import { signUpUser } from './authService';
import { validateEmail, validatePassword } from './validation';

const SignupPage = () => {
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
        ? MSG.auth.confirmPasswordRequired
        : form.confirm !== form.password
          ? MSG.auth.passwordsMismatch
          : '',
    };
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const { nextStep } = await signUpUser(form.email, form.password);
      if (nextStep?.signUpStep === 'CONFIRM_SIGN_UP') {
        notify(MSG.auth.signupSuccess, 'success');
        navigate(
          `${ROUTES.CONFIRM_SIGNUP}?email=${encodeURIComponent(form.email)}`
        );
      } else {
        notify(MSG.auth.confirmSuccess, 'success');
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      notify(
        error.name === 'UsernameExistsException'
          ? 'Nalog sa ovim emailom već postoji.'
          : MSG.auth.signupFailed,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Registracija"
      subtitle="Napravite nalog za rad sa ugovorima."
      onSubmit={handleSubmit}
      footer={
        <>
          Već imate nalog?{' '}
          <Link component={RouterLink} to={ROUTES.LOGIN}>
            Prijavite se
          </Link>
        </>
      }
    >
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        {...field('email')}
      />
      <PasswordField
        label="Lozinka"
        autoComplete="new-password"
        {...field('password')}
      />
      <PasswordField
        label="Potvrdi lozinku"
        autoComplete="new-password"
        {...field('confirm')}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          'Registruj se'
        )}
      </Button>
    </AuthCard>
  );
};

export default SignupPage;
