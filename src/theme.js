import { createContext, useState, useMemo, useContext } from 'react';
import { createTheme } from '@mui/material/styles';

const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        palette: {
          mode: 'dark',
          grey: {
            100: '#e0e0e0',
            200: '#c2c2c2',
            300: '#a3a3a3',
            400: '#858585',
            500: '#666666',
            600: '#525252',
            700: '#3d3d3d',
            800: '#292929',
            900: '#141414',
          },
          lightGrey: {
            100: '#f9f9f9',
            200: '#f0f0f0',
            300: '#e6e6e6',
            400: '#dcdcdc',
            500: '#d3d3d3',
            600: '#c9c9c9',
            700: '#bfbfbf',
            800: '#b5b5b5',
            900: '#ababab',
          },
          primary: {
            light: '#a1a4ab',
            main: '#336699',
            dark: '#101624',
            contrastText: '#ffffff',
          },
          businessBlue: {
            light: '#6699cc',
            main: '#336699',
            dark: '#003366',
            contrastText: '#ffffff',
          },
          secondary: {
            light: '#70d8bd',
            main: '#4cceac',
            dark: '#3da58a',
            contrastText: '#000000',
          },
          background: {
            default: '#141b2d',
            paper: '#1F2A40',
            white: '#fff',
          },
        },
      }
    : {
        palette: {
          mode: 'light',
          grey: {
            100: '#141414',
            200: '#292929',
            300: '#3d3d3d',
            400: '#525252',
            500: '#666666',
            600: '#858585',
            700: '#a3a3a3',
            800: '#c2c2c2',
            900: '#e0e0e0',
          },
          lightGrey: {
            100: '#bbbbbb',
            200: '#c3c3c3',
            300: '#cccccc',
            400: '#d4d4d4',
            500: '#dddddd',
            600: '#e5e5e5',
            700: '#eeeeee',
            800: '#f7f7f7',
            900: '#ffffff',
          },

          primary: {
            light: '#f2f0f0',
            main: '#336699',
            dark: '#080b12',
            contrastText: '#ffffff',
          },
          businessBlue: {
            light: '#6699cc',
            main: '#336699',
            dark: '#003366',
            contrastText: '#ffffff',
          },
          secondary: {
            light: '#94e2cd',
            main: '#4cceac',
            dark: '#1e5245',
            contrastText: '#000000',
          },
          background: {
            default: '#ffffff',
            paper: '#f2f0f0',
            white: '#fff',
          },
        },
      }),
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(tokens(mode)), [mode]);

  return [theme, colorMode];
};

export const useTheme = () => useContext(ColorModeContext);
