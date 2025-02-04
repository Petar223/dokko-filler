import { createContext, useState, useMemo, useContext } from "react";
import { createTheme } from "@mui/material/styles";
import { tokens } from "./tokens";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [],
  );

  const theme = useMemo(() => createTheme(tokens(mode)), [mode]);

  return [theme, colorMode];
};

export const useTheme = () => useContext(ColorModeContext);
