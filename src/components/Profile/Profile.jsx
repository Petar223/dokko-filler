import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InfoCircleLineIcon, PowerOffLineIcon } from '~components/Icons';
import WelcomeTour from '~components/WelcomeTour/WelcomeTour';
import { useAuth } from '~context/AuthContext';
import { useNotification } from '~context/NotificationContext';
import useTour from '~hooks/useTour';
import Icon from '~shared-components/Icon/Icon';
import { ROUTES } from '~utils/routes';

const initials = (email = '') => email.slice(0, 2).toUpperCase();

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const notify = useNotification();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const welcomeTour = useTour(user && `welcome:${user}`, { autoStart: true });

  const handleReplayTour = () => {
    setAnchorEl(null);
    welcomeTour.start();
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    try {
      await logout();
      notify(t('auth.logoutSuccess'), 'success', 3000);
      navigate(ROUTES.LOGIN);
    } catch {
      notify(t('auth.logoutFailed'), 'error');
    }
  };

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        data-tour="user-menu"
        aria-label={t('header.userMenu')}
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
        <MenuItem onClick={handleReplayTour}>
          <ListItemIcon>
            <Icon as={InfoCircleLineIcon} size={18} />
          </ListItemIcon>
          {t('tour.menu')}
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'inherit' }}>
            <Icon as={PowerOffLineIcon} size={18} />
          </ListItemIcon>
          {t('header.logout')}
        </MenuItem>
      </Menu>
      <WelcomeTour run={welcomeTour.run} onEnd={welcomeTour.end} />
    </>
  );
};

export default Profile;
