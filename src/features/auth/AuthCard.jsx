import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Icon from '~ui/Icon';
import { FileLineIcon } from '~ui/Icons';

/** Centered card shell shared by login, signup and confirmation. */
const AuthCard = ({ title, subtitle, onSubmit, children, footer }) => (
  <Box sx={{ display: 'grid', placeItems: 'center', flex: 1, py: 4 }}>
    <Card
      sx={{
        width: '100%',
        maxWidth: 420,
        p: { xs: 3, sm: 4 },
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <Stack
        spacing={1}
        sx={{ alignItems: 'center', mb: 3, textAlign: 'center' }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 3,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            mb: 1,
          }}
        >
          <Icon as={FileLineIcon} size={24} />
        </Box>
        <Typography variant="h3" component="h1">
          {title}
        </Typography>
        {subtitle && <Typography color="text.secondary">{subtitle}</Typography>}
      </Stack>
      <Stack component="form" spacing={2} noValidate onSubmit={onSubmit}>
        {children}
      </Stack>
      {footer && (
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          {footer}
        </Typography>
      )}
    </Card>
  </Box>
);

export default AuthCard;
