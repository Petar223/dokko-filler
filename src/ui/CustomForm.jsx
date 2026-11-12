import React from 'react';
import { Box } from '@mui/material';

const CustomForm = ({ children, onSubmit }) => {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      {children}
    </Box>
  );
};

export default CustomForm;
