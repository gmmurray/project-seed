import { ApiHandlerError } from '../apiHandler/apiHandlerError';
import { SnackbarAlertContextValue } from '../../components/layout/SnackbarProvider';

export const sendResolvedSnackbarError = (
  snackbar: SnackbarAlertContextValue,
  error: any,
  defaultMessage: string,
) => {
  let message: string = defaultMessage;
  let description: string | undefined = undefined;

  if (error instanceof ApiHandlerError) {
    if (error.type !== 'unknown') {
      message = error.title;
      description = error.message;
    }
  }

  snackbar.error(message, description);
};
