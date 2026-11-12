import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotification } from '~context/NotificationContext';
import { confirmSignUpUser, resendCode } from '~utils/cognitoAuth';
import { MSG } from '~utils/messages';
import { ROUTES } from '~utils/routes';
import { validateEmail } from '~utils/validation';
import AuthCard from './AuthCard';

const ConfirmSignup = () => {
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const notify = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      email: validateEmail(email),
      code: code.trim() ? '' : MSG.auth.codeRequired,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.code) return;

    setLoading(true);
    try {
      await confirmSignUpUser(email, code.trim());
      notify(MSG.auth.confirmSuccess, 'success');
      navigate(ROUTES.LOGIN);
    } catch {
      notify(MSG.auth.confirmFailed, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const emailError = validateEmail(email);
    setErrors({ email: emailError });
    if (emailError) return;
    try {
      await resendCode(email);
      notify(MSG.auth.codeResent, 'success');
    } catch {
      notify(MSG.generic, 'error');
    }
  };

  return (
    <AuthCard
      title="Potvrda naloga"
      subtitle="Unesite kod koji smo poslali na vaš email."
      onSubmit={handleSubmit}
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
      <TextField
        label="Kod za potvrdu"
        autoComplete="one-time-code"
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!errors.code}
        helperText={errors.code}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? <CircularProgress size={22} color="inherit" /> : 'Potvrdi'}
      </Button>
      <Button onClick={handleResend} disabled={loading}>
        Pošalji kod ponovo
      </Button>
    </AuthCard>
  );
};

export default ConfirmSignup;
