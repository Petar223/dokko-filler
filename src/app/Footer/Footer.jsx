import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      height: 40,
      flexShrink: 0,
      px: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTop: 1,
      borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    <Typography variant="caption" color="text.secondary">
      &copy; {new Date().getFullYear()} Dokko Filler
    </Typography>
    <Typography variant="caption" color="text.secondary">
      v{process.env.APP_VERSION}
    </Typography>
  </Box>
);

export default Footer;
