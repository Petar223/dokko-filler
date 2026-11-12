import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/** Key-value rows: items = [{ label, value }]. */
const FieldList = ({ items }) => (
  <Box
    component="dl"
    sx={{
      m: 0,
      display: 'grid',
      gridTemplateColumns: 'minmax(110px, auto) 1fr',
      columnGap: 2,
      rowGap: 1.25,
    }}
  >
    {items.map(({ label, value }) => (
      <Box key={label} sx={{ display: 'contents' }}>
        <Typography component="dt" variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography
          component="dd"
          variant="body2"
          sx={{ m: 0, fontWeight: 600, wordBreak: 'break-word' }}
        >
          {value || '—'}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default FieldList;
