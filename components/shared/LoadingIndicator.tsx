import { CircularProgress } from '@mui/material';
import MessageWrapper from './MessageWrapper';
import React from 'react';

export default function LoadingIndicator() {
  return (
    <MessageWrapper title="Loading...">
      <CircularProgress sx={{ mt: 2 }} />
    </MessageWrapper>
  );
}
