import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useAuth } from '~context/AuthContext';
import { useNotification } from '~context/NotificationContext';
import PasswordField from '~shared-components/PasswordField/PasswordField';
import { signInUser } from '~utils/cognitoAuth';
import { ROUTES } from '~utils/routes';
import { safeRedirect, validateEmail } from '~utils/validation';
import AuthCard from './AuthCard';

const Login = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();

  // From PrivateRoute (state) or from a 401 redirect (?from=).
  const from = safeRedirect(
    location.state?.from?.pathname ?? params.get('from'),
    ROUTES.DOCUMENTS
  );

  const goToConfirm = () => {
    notify(t('auth.needsConfirmation'), 'info');
    navigate(`${ROUTES.CONFIRM_SIGNUP}?email=${encodeURIComponent(email)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      password: password ? '' : t('auth.passwordRequired'),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);
    try {
      const { isSignedIn, nextStep } = await signInUser(email, password);
      if (isSignedIn) {
        await login();
        notify(t('auth.loginSuccess'), 'success', 3000);
        navigate(from, { replace: true });
      } else if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        goToConfirm();
      } else {
        notify(t('auth.unsupportedStep'), 'warning');
      }
    } catch (error) {
      if (error.name === 'UserNotConfirmedException') goToConfirm();
      else notify(t('auth.loginFailed'), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title={t('auth.loginTitle')}
      subtitle={t('auth.loginSubtitle')}
      onSubmit={handleSubmit}
      footer={
        <>
          {t('auth.noAccount')}{' '}
          <Link component={RouterLink} to={ROUTES.SIGNUP}>
            {t('auth.signupLink')}
          </Link>
        </>
      }
    >
      <TextField
        label={t('auth.email')}
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <PasswordField
        label={t('auth.password')}
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          t('auth.loginSubmit')
        )}
      </Button>
    </AuthCard>
  );
};

export default Login;
