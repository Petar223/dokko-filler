import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '~app/Notifications';
import { MSG } from '~constants/messages';
import { ROUTES } from '~constants/routes';
import { useAuth } from '~features/auth/AuthContext';
import Icon from '~ui/Icon';
import { PowerOffLineIcon } from '~ui/Icons';

const initials = (email = '') => email.slice(0, 2).toUpperCase();

const Profile = () => {
  const navigate = useNavigate();
  const notify = useNotification();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await logout();
      notify(MSG.auth.logoutSuccess, 'success', 3000);
      navigate(ROUTES.LOGIN);
    } catch {
      notify(MSG.auth.logoutFailed, 'error');
    }
  };

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label="Korisnički meni"
        aria-haspopup="menu"
        aria-expanded={Boolean(anchorEl)}
        sx={{ p: 0.5 }}
      >
        <Avatar
          sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 14 }}
        >
          {initials(user)}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ px: 2, py: 1, maxWidth: 260 }}
          noWrap
        >
          {user}
        </Typography>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Icon as={PowerOffLineIcon} size={18} />
          </ListItemIcon>
          Odjava
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
