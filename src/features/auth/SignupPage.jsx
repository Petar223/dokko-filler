import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpUtil } from './authService';
import CustomTextField from '~ui/CustomTextField';
import CustomForm from '~ui/CustomForm';
import CustomButton from '~ui/CustomButton';
import FormWrapper from '~ui/FormWrapper';
import LinkContainer from '~ui/LinkContainer';
import { useNotification } from '~app/NotificationContext';
import CircularProgress from '@mui/material/CircularProgress';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = useNotification();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const hasNumber = /[0-9]/;

    if (!minLength.test(password)) {
      return 'Lozinka mora imati najmanje 6 karaktera.';
    }
    if (!hasUpperCase.test(password)) {
      return 'Lozinka mora sadržati bar jedno veliko slovo.';
    }
    if (!hasSpecialChar.test(password)) {
      return 'Lozinka mora sadržati bar jedan specijalni karakter.';
    }
    if (!hasNumber.test(password)) {
      return 'Lozinka mora sadržati bar jedan broj.';
    }
    return '';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let isValid = true;

    if (!email) {
      setEmailError('Email je obavezan.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email nije validan.');
      isValid = false;
    }

    const passwordValidationMessage = validatePassword(password);

    if (!password) {
      setPasswordError('Lozinka je obavezna.');
      isValid = false;
    } else if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Potvrda lozinke je obavezna.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Lozinke se ne podudaraju.');
      isValid = false;
    }

    if (!isValid) {
      setIsLoading(false);
      return;
    }

    try {
      await signUpUtil(email, password);
      showNotification(
        'Uspešno ste se registrovali! Možete se sada prijaviti.',
        3000,
        'success'
      );
      navigate('/documents');
    } catch (err) {
      console.log(err);
      setIsLoading(false);

      showNotification(
        'Došlo je do greške prilikom registracije. Molimo vas pokušajte opet.',
        5000,
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper>
      <h2>Registracija</h2>
      <CustomForm onSubmit={handleSignup}>
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

        <CustomTextField
          label="Potvrdi Lozinku"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!confirmPasswordError}
          helperText={confirmPasswordError}
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
            'Registruj se'
          )}
        </CustomButton>

        <LinkContainer>
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            Već imate nalog? Prijavite se
          </Link>
        </LinkContainer>
      </CustomForm>
    </FormWrapper>
  );
}

export default Signup;
