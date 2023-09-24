import { ThemeOptions, createTheme, responsiveFontSizes } from '@mui/material';

const theme: ThemeOptions = {
  palette: {
    mode: 'dark',
    // primary: {
    //   main: '#6947dc',
    // },
    // secondary: {
    //   main: '#1976d2',
    // },
    // background: {
    //   paper: '#121734',
    //   default: '#121734',
    // },
  },
};

export const getTheme = () => {
  return responsiveFontSizes(createTheme(theme));
};
