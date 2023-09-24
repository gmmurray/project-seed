import {
  Box,
  Drawer,
  List,
  ListItemButton,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { Fragment } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { pageRouteMap } from '../../../lib/routes/pageRoutes';
import { useIsSmallScreen } from '../../../lib/hooks/useIsSmallScreen';

const drawerWidth = 240;

type PageDrawerItemProps = {
  icon: JSX.Element;
  title: string;
  href: string;
};

type PageDrawerProps = {
  open: boolean;
  onToggle: () => void;
};

const PageDrawer = ({ open, onToggle }: PageDrawerProps) => {
  const isSmallScreen = useIsSmallScreen();
  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant={isSmallScreen ? 'temporary' : 'permanent'}
        open={open}
        onClose={onToggle}
        ModalProps={{ keepMounted: isSmallScreen }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {pageDrawerSections.map((section, sectionIndex) => {
              return (
                <Fragment key={sectionIndex}>
                  {!!section.sectionTitle && (
                    <ListSubheader
                      component={Typography}
                      variant="overline"
                      sx={{ backgroundColor: 'inherit' }}
                    >
                      {section.sectionTitle}
                    </ListSubheader>
                  )}
                  {section.items.map((item, itemIndex) => {
                    return <PageDrawerItem {...item} key={itemIndex} />;
                  })}
                </Fragment>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default PageDrawer;

const PageDrawerItem = ({
  icon,
  title,
  href: pathname,
}: PageDrawerItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} href={pathname} passHref>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};

const pageDrawerSections: {
  sectionTitle?: string;
  items: PageDrawerItemProps[];
}[] = [
  {
    sectionTitle: undefined,
    items: [
      {
        ...pageRouteMap.home,
        icon: <HomeIcon />,
      },
    ],
  },
];
