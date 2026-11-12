import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { EyeLookIcon, HidePrivateHiddenIcon } from '~ui/Icons';
import styled from 'styled-components';

const StyledEyeIcon = styled(EyeLookIcon)`
  height: 24px;
  width: 24px;
  fill: ${({ theme }) => theme.palette.grey[700]};
  transition: fill 0.3s ease;

  &:hover {
    fill: ${({ theme }) => theme.palette.grey[300]};
  }
`;

const StyledHideIcon = styled(HidePrivateHiddenIcon)`
  height: 24px;
  width: 24px;
  fill: ${({ theme }) => theme.palette.grey[700]};
  transition: fill 0.3s ease;

  &:hover {
    fill: ${({ theme }) => theme.palette.grey[300]};
  }
`;

const CustomTextField = ({
  label,
  type,
  value,
  onChange,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <TextField
      label={label}
      type={type === 'password' && !showPassword ? 'password' : 'text'}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      margin="normal"
      variant="outlined"
      slotProps={{
        input: {
          endAdornment:
            type === 'password' ? (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <StyledEyeIcon /> : <StyledHideIcon />}
                </IconButton>
              </InputAdornment>
            ) : null,
        },
      }}
    />
  );
};

export default CustomTextField;
