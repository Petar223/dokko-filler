import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useNotification } from '~app/Notifications';
import { MSG } from '~constants/messages';
import { ROUTES } from '~constants/routes';
import PasswordField from '~ui/PasswordField';
import AuthCard from './AuthCard';
import { useAuth } from './AuthContext';
import { signInUser } from './authService';
import { safeRedirect, validateEmail } from './validation';

const LoginPage = () => {
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
    notify(MSG.auth.needsConfirmation, 'info');
    navigate(`${ROUTES.CONFIRM_SIGNUP}?email=${encodeURIComponent(email)}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      password: password ? '' : MSG.auth.passwordRequired,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    setLoading(true);
    try {
      const { isSignedIn, nextStep } = await signInUser(email, password);
      if (isSignedIn) {
        await login();
        notify(MSG.auth.loginSuccess, 'success', 3000);
        navigate(from, { replace: true });
      } else if (nextStep?.signInStep === 'CONFIRM_SIGN_UP') {
        goToConfirm();
      } else {
        notify(MSG.auth.unsupportedStep, 'warning');
      }
    } catch (error) {
      if (error.name === 'UserNotConfirmedException') goToConfirm();
      else notify(MSG.auth.loginFailed, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Prijava"
      subtitle="Prijavite se da biste pristupili ugovorima."
      onSubmit={handleSubmit}
      footer={
        <>
          Nemate nalog?{' '}
          <Link component={RouterLink} to={ROUTES.SIGNUP}>
            Registrujte se
          </Link>
        </>
      }
    >
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
      />
      <PasswordField
        label="Lozinka"
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
          'Prijavi se'
        )}
      </Button>
    </AuthCard>
  );
};

export default LoginPage;
