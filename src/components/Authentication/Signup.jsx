import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpUtil } from "../../utils/cognitoAuth";
import CustomTextField from "~shared-components/CustomTextField/CustomTextField";
import CustomForm from "~shared-components/CustomForm/CustomForm";
import CustomButton from "~shared-components/CustomButton/CustomButton";
import FormWrapper from "~shared-components/shared-styled-components/FormWrapper/FormWrapper";
import LinkContainer from "~shared-components/shared-styled-components/LinkContainer/LinkContainer";
import { useNotification } from "~context/NotificationContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email je obavezan.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email nije validan.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Lozinka je obavezna.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Lozinka mora imati najmanje 6 karaktera.");
      isValid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Potvrda lozinke je obavezna.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Lozinke se ne podudaraju.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    try {
      await signUpUtil(email, password);
      showNotification(
        "Uspešno ste se registrovali! Možete se sada prijaviti.",
        3000,
        "success",
      );
      navigate("/documents");
    } catch (err) {
      console.log(err);
      showNotification(
        "Došlo je do greške prilikom registracije. Molimo vas pokušajte opet.",
        5000,
        "error",
      );
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
          Registruj se
        </CustomButton>

        <LinkContainer>
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Već imate nalog? Prijavite se
          </Link>
        </LinkContainer>
      </CustomForm>
    </FormWrapper>
  );
}

export default Signup;
