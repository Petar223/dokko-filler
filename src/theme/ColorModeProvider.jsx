import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { getComponents } from './components';
import { getPalette } from './palette';
import { typography } from './typography';

const STORAGE_KEY = 'dokko-color-mode';

const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});
export const useColorMode = () => useContext(ColorModeContext);

const getInitialMode = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // storage blocked: fall through to the system preference
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const buildTheme = (mode) => {
  const palette = getPalette(mode);
  return createTheme({
    palette,
    typography,
    shape: { borderRadius: 10 },
    spacing: 8,
    components: getComponents(createTheme({ palette }).palette),
  });
};

const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  const theme = useMemo(() => buildTheme(mode), [mode]);
  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')),
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ColorModeProvider;
