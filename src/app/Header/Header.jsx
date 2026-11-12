import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '~constants/routes';
import { AUTH_STATUS, useAuth } from '~features/auth/AuthContext';
import Icon from '~ui/Icon';
import { FileLineIcon } from '~ui/Icons';
import Profile from './Profile';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { status } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        flexShrink: 0,
        px: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Stack
        component={RouterLink}
        to={ROUTES.HOME}
        direction="row"
        spacing={1.25}
        sx={{
          alignItems: 'center',
          color: 'text.primary',
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Icon as={FileLineIcon} size={18} />
        </Box>
        <Typography variant="h6" component="span" sx={{ fontWeight: 700 }}>
          Dokko Filler
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <ThemeToggle />
        {status === AUTH_STATUS.AUTHENTICATED && <Profile />}
        {status === AUTH_STATUS.ANONYMOUS && (
          <Button component={RouterLink} to={ROUTES.LOGIN} variant="contained">
            Prijava
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default Header;
