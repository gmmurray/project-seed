import { Box, Fab, Fade, useScrollTrigger } from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const ScrollTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        role="presentation"
        sx={{ position: 'fixed', bottom: 48, right: 24 }}
        onClick={handleClick}
      >
        <Fab color="primary" size="small">
          <ArrowUpwardIcon />
        </Fab>
      </Box>
    </Fade>
  );
};

export default ScrollTopButton;
