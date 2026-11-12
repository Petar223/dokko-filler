import ButtonBase from '@mui/material/ButtonBase';
import CircularProgress from '@mui/material/CircularProgress';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Icon from '~ui/Icon';

const PlaceholderCard = ({ icon, name, onClick, loading, disabled }) => (
  <ButtonBase
    onClick={onClick}
    disabled={disabled || loading}
    aria-label={`Učitaj sa čitača: ${name}`}
    aria-busy={loading}
    sx={(t) => ({
      width: '100%',
      minHeight: 320,
      p: 3,
      borderRadius: '14px',
      border: `2px dashed ${t.palette.divider}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 1.5,
      color: 'text.secondary',
      transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
      '&:hover, &.Mui-focusVisible': {
        borderColor: 'primary.main',
        color: 'primary.main',
        bgcolor: alpha(t.palette.primary.main, 0.04),
      },
      '&.Mui-disabled': { opacity: loading ? 1 : 0.6 },
    })}
  >
    {loading ? (
      <>
        <CircularProgress size={36} />
        <Typography variant="body2">Čitanje kartice…</Typography>
      </>
    ) : (
      <>
        <Icon as={icon} size={44} />
        <Typography variant="h6" component="span" color="text.primary">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }} color="primary">
          Učitaj sa čitača
        </Typography>
        <Typography variant="caption">Ubacite karticu u čitač</Typography>
      </>
    )}
  </ButtonBase>
);

export default PlaceholderCard;
