import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUtil, signOutUtil } from "../../utils/cognitoAuth";
import CustomTextField from "~shared-components/CustomTextField/CustomTextField";
import CustomForm from "~shared-components/CustomForm/CustomForm";
import CustomButton from "~shared-components/CustomButton/CustomButton";
import FormWrapper from "~shared-components/shared-styled-components/FormWrapper/FormWrapper";
import LinkContainer from "~shared-components/shared-styled-components/LinkContainer/LinkContainer";
import { useNotification } from "~context/NotificationContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const showNotification = useNotification();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

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
    }

    if (!isValid) {
      return;
    }

    try {
      await signInUtil(email, password);
      showNotification("Uspešno ste se prijavili!", 3000, "success");
      navigate("/documents");
    } catch (err) {
      console.log(err);
      showNotification(
        "Došlo je do greške prilikom logovanja. Molimo vas pokušajte opet.",
        5000,
        "error",
      );
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
          Prijavi se
        </CustomButton>

        <LinkContainer>
          <Link
            to="/signup"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Nemate nalog? Registrujte se
          </Link>
        </LinkContainer>
      </CustomForm>
    </FormWrapper>
  );
}

export default Login;
