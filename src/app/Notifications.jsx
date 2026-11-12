import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useCallback, useContext, useState } from 'react';

const NotificationContext = createContext(() => {});

// notify(message, severity = 'info' | 'success' | 'warning' | 'error', duration)
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const notify = useCallback((message, severity = 'info', duration = 5000) => {
    // A new key remounts the Snackbar, which restarts the auto-hide timer.
    setNotification({ message, severity, duration, key: Date.now() });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {notification && (
        <Snackbar
          key={notification.key}
          open
          autoHideDuration={notification.duration}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ mt: 7 }}
        >
          <Alert
            severity={notification.severity}
            variant="filled"
            onClose={handleClose}
            sx={{ maxWidth: 420 }}
          >
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
};
