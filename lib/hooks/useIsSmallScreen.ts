import { useMediaQuery, useTheme } from '@mui/material';

export const useIsSmallScreen = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return isSmallScreen;
};
