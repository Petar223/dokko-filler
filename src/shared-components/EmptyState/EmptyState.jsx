import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { TextDocumentRemoveIcon } from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';

/** Empty, error and "not found" screens. */
const EmptyState = ({
  icon = TextDocumentRemoveIcon,
  title,
  description,
  action,
  color = 'primary',
}) => (
  <Stack
    spacing={2}
    sx={{ alignItems: 'center', textAlign: 'center', py: 8, px: 2, m: 'auto' }}
  >
    <Box
      sx={(theme) => ({
        width: 72,
        height: 72,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
        color: `${color}.main`,
        bgcolor: alpha(theme.palette[color].main, 0.1),
      })}
    >
      <Icon as={icon} size={34} />
    </Box>
    <Typography variant="h4" component="h2">
      {title}
    </Typography>
    {description && (
      <Typography color="text.secondary" sx={{ maxWidth: 440 }}>
        {description}
      </Typography>
    )}
    {action}
  </Stack>
);

export default EmptyState;
