import { Button, ButtonProps } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import React from 'react';

export type PageWrapperBackActionProps = {
  action: LinkAction | OnClickAction;
};

export default function PageWrapperBackAction({
  action,
}: PageWrapperBackActionProps) {
  const buttonProps: ButtonProps = {
    ...(action.buttonProps ?? {}),
  };

  if (isLinkAction(action)) {
    buttonProps.LinkComponent = Link;
    buttonProps.href = action.href;
  } else {
    buttonProps.onClick = action.onClick;
  }

  return (
    <Button
      {...buttonProps}
      variant="text"
      size="small"
      sx={{ color: 'primary.dark', textTransform: 'none' }}
      startIcon={<ArrowBackIcon />}
    >
      {action.text}
    </Button>
  );
}

type LinkAction = {
  href: string;
} & BaseAction;

type OnClickAction = {
  onClick: () => any;
} & BaseAction;

type BaseAction = {
  text: string;
  buttonProps?: ButtonProps;
};

const isLinkAction = (
  button: LinkAction | OnClickAction,
): button is LinkAction => {
  const href = (button as any).href;
  return !!href && typeof href === 'string';
};
