import { Box, Tab } from '@mui/material';
import React, { useCallback } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { isStringOfType } from '../../lib/types/typeGuards';
import { useIsSmallScreen } from '../../lib/hooks/useIsSmallScreen';
import { usePageQueryParam } from '../../lib/hooks/usePageQueryParam';
import { useRouter } from 'next/router';

type Props<TTabKey extends string[]> = {
  tabs: {
    value: TTabKey[number];
    label: string;
    content: React.JSX.Element;
  }[];
};

export default function ResponsiveTabs<TTabKey extends string[]>({
  tabs,
}: Props<TTabKey>) {
  const isSmallScreen = useIsSmallScreen();
  const router = useRouter();
  const tabQueryValue = usePageQueryParam('tab');
  const tabResolvedValue = getTabValue(
    tabQueryValue,
    tabs.map(t => t.value),
  );

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newTab: string) => {
      router.push({
        ...router,
        query: {
          ...router.query,
          tab: newTab,
        },
      });
    },
    [router],
  );

  return (
    <TabContext value={tabResolvedValue}>
      <Box
        sx={{
          display: {
            xs: undefined,
            md: 'flex',
          },
        }}
      >
        <Box
          sx={{
            borderBottom: {
              xs: 1,
              md: 'none',
            },
            borderColor: {
              xs: 'divider',
              md: 'unset',
            },
          }}
        >
          <TabList
            orientation={!isSmallScreen ? 'vertical' : 'horizontal'}
            variant={!isSmallScreen ? 'scrollable' : undefined}
            onChange={handleTabChange}
          >
            {tabs.map(t => {
              return <Tab label={t.label} value={t.value} key={t.value} />;
            })}
          </TabList>
        </Box>
        <Box sx={{ flex: 1 }}>
          {tabs.map(t => {
            return (
              <TabPanel value={t.value} key={t.value}>
                {t.content}
              </TabPanel>
            );
          })}
        </Box>
      </Box>
    </TabContext>
  );
}

const getTabValue = <TTabKey extends string[]>(
  value: any,
  options: TTabKey,
): TTabKey[number] =>
  isStringOfType(value, [...options]) ? value : options[0];
