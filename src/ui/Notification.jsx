import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import styled from 'styled-components';

const StyledSnackbar = styled(Snackbar)`
  margin-top: 45px;
`;

const StyledAlert = styled(Alert)`
  word-break: break-word;
  max-width: 300px;
`;

function Notification({ message, type = 'info', duration = 5000, onClose }) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <StyledSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <StyledAlert severity={type} variant="filled">
        {message}
      </StyledAlert>
    </StyledSnackbar>
  );
}

export default Notification;
