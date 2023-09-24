import { Alert, AlertTitle, Snackbar } from '@mui/material';
import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

type SnackbarAlertType = 'error' | 'warning' | 'info' | 'success';

export type SnackbarAlertContextValue = {
  send: (
    message: string,
    type: SnackbarAlertType,
    description?: string,
  ) => void;
  success: (message: string, description?: string) => void;
  error: (message: string, description?: string) => void;
  onClose: () => void;
  open: boolean;
  message?: string;
};

const initialValue: SnackbarAlertContextValue = {
  send: () => {},
  success: () => {},
  error: () => {},
  onClose: () => {},
  open: false,
};

export const SnackbarAlertContext = createContext(initialValue);

export const useSnackbarAlert = () => useContext(SnackbarAlertContext);

export const SnackbarAlertProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Alert');
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [type, setType] = useState<SnackbarAlertType>('info');

  const handleOpen = useCallback(
    (message: string, type: SnackbarAlertType, description?: string) => {
      setOpen(true);
      setMessage(message);
      setDescription(description);
      setType(type);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const value: SnackbarAlertContextValue = {
    send: handleOpen,
    success: (msg, description) => handleOpen(msg, 'success', description),
    error: (msg, description) => handleOpen(msg, 'error', description),
    onClose: handleClose,
    open,
    message,
  };

  const renderMessage = () => {
    if (!message) {
      return undefined;
    }

    if (description) {
      return (
        <Fragment>
          <AlertTitle>{message}</AlertTitle>
          {description}
        </Fragment>
      );
    }

    return message;
  };

  return (
    <SnackbarAlertContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{ minWidth: '25%' }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {renderMessage()}
        </Alert>
      </Snackbar>
    </SnackbarAlertContext.Provider>
  );
};
