import { createTheme } from '@mui/material/styles';
import { createContext, useContext } from 'react';
import { getComponents } from './components';
import { getPalette } from './palette';
import { typography } from './typography';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

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
