import '../styles/globals.scss';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { getTheme } from '../config/muiTheme';
import { reactQueryClient } from '../config/reactQueryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={getTheme()}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Head>
          <title>Project Seed</title>
        </Head>
        <UserProvider>
          <QueryClientProvider client={reactQueryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </UserProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
