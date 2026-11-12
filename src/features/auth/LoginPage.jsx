import CircularProgress from '@mui/material/CircularProgress';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInUtil } from './authService';
import { useAuth } from './AuthContext';
import { useNotification } from '~app/NotificationContext';
import CustomButton from '~ui/CustomButton';
import CustomForm from '~ui/CustomForm';
import CustomTextField from '~ui/CustomTextField';
import FormWrapper from '~ui/FormWrapper';
import LinkContainer from '~ui/LinkContainer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showNotification = useNotification();
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);

    let isValid = true;

    if (!email) {
      setEmailError('Email je obavezan.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email nije validan.');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Lozinka je obavezna.');
      isValid = false;
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      const userData = await signInUtil(email, password);
      login(userData.isSignedIn);
      showNotification('Uspešno ste se prijavili!', 3000, 'success');
      navigate('/documents');
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      showNotification(
        'Došlo je do greške prilikom logovanja. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper>
      <h2>Prijava</h2>
      <CustomForm onSubmit={handleLogin}>
        <CustomTextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError}
        />

        <CustomTextField
          label="Lozinka"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={!!passwordError}
          helperText={passwordError}
        />

        <CustomButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Prijavi se'
          )}
        </CustomButton>

        <LinkContainer>
          <Link
            to="/signup"
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            Nemate nalog? Registrujte se
          </Link>
        </LinkContainer>
      </CustomForm>
    </FormWrapper>
  );
}

export default Login;
