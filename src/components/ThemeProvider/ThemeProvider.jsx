import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { useMode } from "../../theme/theme";

function ThemeProvider({ children }) {
  const [theme] = useMode();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
