import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useNotification } from '~context/NotificationContext';
import { confirmSignUpUser, resendCode } from '~utils/cognitoAuth';
import { ROUTES } from '~utils/routes';
import { validateEmail } from '~utils/validation';
import AuthCard from './AuthCard';

const ConfirmSignup = () => {
  const { t } = useTranslation();
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
      code: code.trim() ? '' : t('auth.codeRequired'),
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.code) return;

    setLoading(true);
    try {
      await confirmSignUpUser(email, code.trim());
      notify(t('auth.confirmSuccess'), 'success');
      navigate(ROUTES.LOGIN);
    } catch {
      notify(t('auth.confirmFailed'), 'error');
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
      notify(t('auth.codeResent'), 'success');
    } catch {
      notify(t('generic'), 'error');
    }
  };

  return (
    <AuthCard
      title={t('auth.confirmTitle')}
      subtitle={t('auth.confirmSubtitle')}
      onSubmit={handleSubmit}
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
      <TextField
        label={t('auth.code')}
        autoComplete="one-time-code"
        slotProps={{ htmlInput: { inputMode: 'numeric' } }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        error={!!errors.code}
        helperText={errors.code}
      />
      <Button type="submit" variant="contained" size="large" disabled={loading}>
        {loading ? (
          <CircularProgress size={22} color="inherit" />
        ) : (
          t('auth.confirmSubmit')
        )}
      </Button>
      <Button onClick={handleResend} disabled={loading}>
        {t('auth.resendCode')}
      </Button>
    </AuthCard>
  );
};

export default ConfirmSignup;
