import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { createGenericContext } from '../../lib/helpers/reactHelpers';

type ConfirmOptions = { title?: string; text: string };
type ConfirmDialogContextValue = {
  confirm: (callback: () => any, options: ConfirmOptions) => any;
};

export const [useConfirmDialog, ConfirmationContextProvider] =
  createGenericContext<ConfirmDialogContextValue>();

export default function ConfirmationProvider({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const [confirmationCallback, setConfirmationCallback] = useState<
    (() => any) | undefined
  >(undefined);
  const [confirmationOptions, setConfirmationOptions] = useState<
    ConfirmOptions | undefined
  >(undefined);

  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  const confirm = useCallback(
    (callback: () => any, options: ConfirmOptions) => {
      handleOpen();
      setConfirmationCallback(() => callback);
      setConfirmationOptions(options);
    },
    [handleOpen],
  );

  const handleCancel = useCallback(() => {
    handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (!open) {
      setConfirmationCallback(undefined);
      setConfirmationOptions(undefined);
    }
  }, [open]);

  const handleConfirm = useCallback(() => {
    if (confirmationCallback) {
      confirmationCallback();
    }
    handleCancel();
  }, [confirmationCallback, handleCancel]);

  return (
    <ConfirmationContextProvider value={{ confirm }}>
      {children}
      <Dialog maxWidth="xs" open={open} transitionDuration={0}>
        <DialogTitle>{confirmationOptions?.title ?? 'Confirm'}</DialogTitle>
        <DialogContent dividers>{confirmationOptions?.text}</DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCancel}
            variant="outlined"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleConfirm()}
            variant="contained"
            disableElevation
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationContextProvider>
  );
}
