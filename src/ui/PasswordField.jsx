import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Icon from './Icon';
import { EyeLookIcon, HidePrivateHiddenIcon } from './Icons';

const PasswordField = (props) => {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      type={visible ? 'text' : 'password'}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setVisible((v) => !v)}
                edge="end"
                aria-label={visible ? 'Sakrij lozinku' : 'Prikaži lozinku'}
              >
                <Icon
                  as={visible ? EyeLookIcon : HidePrivateHiddenIcon}
                  size={20}
                />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default PasswordField;
