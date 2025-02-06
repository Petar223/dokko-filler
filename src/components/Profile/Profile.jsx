import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signOutUtil } from '../../utils/cognitoAuth';
import { useNotification } from '~context/NotificationContext';
import { useAuth } from '~context/AuthContext';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { MyAccountIcon, PowerOffLineIcon } from '~components/Icons';

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

const StyledMyAccountIcon = styled(MyAccountIcon)`
  width: 32px;
  height: 32px;
  fill: ${({ theme }) => theme.palette.primary.contrastText};
`;

const StyledSwitchIcon = styled(PowerOffLineIcon)`
  width: 24px;
  height: 24px;
  margin-left: 40px;
  fill: ${({ theme }) => theme.palette.grey[100]};
`;

const Profile = () => {
  const navigate = useNavigate();
  const showNotification = useNotification();
  const { user, logout, refreshUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    try {
      await signOutUtil();
      logout();
      await refreshUser();

      showNotification('Uspešno ste se odjavili.', 3000, 'success');
      navigate('/login');
    } catch (error) {
      showNotification('Greška pri odjavi. Pokušajte ponovo.', 5000, 'error');
    }
  };

  return (
    <ProfileContainer>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color='inherit'>
        <StyledMyAccountIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem disabled>{user || 'Korisnik'}</MenuItem>
        <MenuItem onClick={handleLogout}>
          <span>Odjava</span>
          <StyledSwitchIcon />
        </MenuItem>
      </Menu>
    </ProfileContainer>
  );
};

export default Profile;
