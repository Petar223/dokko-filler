import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import GlobalStyles from '@mui/material/GlobalStyles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useRef, useState } from 'react';
import { downloadBlob } from '~lib/document/download';
import Icon from '~ui/Icon';
import { CloseLineIcon, DownloadToStorageIcon } from '~ui/Icons';
import DocxViewer from './DocxViewer';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const clampZoom = (z) =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100));

// 1 stranica, 2-4 stranice, 5+ stranica (12-14 -> stranica)
const pageCountLabel = (n) => {
  const few = n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14);
  return `${n} ${few ? 'stranice' : 'stranica'}`;
};

const pageStyles = (theme) => ({
  // docx-preview wrapper: transparent so our canvas color shows through.
  '.docx-wrapper': {
    background: 'transparent !important',
    padding: `${theme.spacing(3)} !important`,
  },
  // Paper stays white in dark mode too: this is what gets printed.
  'section.docx': {
    background: '#fff',
    color: '#000',
    boxShadow: '0 2px 12px rgba(15, 23, 42, 0.18) !important',
    marginBottom: `${theme.spacing(3)} !important`,
  },
  '.docx-fallback': {
    maxWidth: 794,
    minHeight: 1123,
    margin: '0 auto',
    padding: '72px',
    fontFamily: '"Times New Roman", serif',
  },
});

const printStyles = (
  <GlobalStyles
    styles={{
      '@media print': {
        '#root, .no-print': { display: 'none !important' },
        '.MuiDialog-root, .MuiDialog-container, .MuiDialog-paper, .preview-canvas':
          {
            position: 'static !important',
            overflow: 'visible !important',
            height: 'auto !important',
            background: 'none !important',
          },
        '.preview-canvas > div': { zoom: '1 !important' },
        '.docx-wrapper': { padding: '0 !important' },
        'section.docx': {
          boxShadow: 'none !important',
          margin: '0 !important',
          breakAfter: 'page',
        },
      },
    }}
  />
);

const DocumentPreviewDialog = ({
  open,
  onClose,
  title,
  previewBlob,
  downloadBlob: cleanBlob,
  missingFields = [],
}) => {
  const [zoom, setZoom] = useState(1);
  const [highlight, setHighlight] = useState(true);
  const [pages, setPages] = useState(null);
  const canvasRef = useRef(null);

  const fitWidth = () => {
    const page = canvasRef.current?.querySelector('section.docx');
    if (!page) return;
    const pageWidth = page.getBoundingClientRect().width / zoom;
    setZoom(clampZoom((canvasRef.current.clientWidth - 64) / pageWidth));
  };

  const handleDownload = () => downloadBlob(cleanBlob, `${title}.docx`);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="preview-title"
    >
      {printStyles}
      <Stack
        className="no-print"
        direction="row"
        spacing={1.5}
        sx={{
          px: { xs: 1.5, sm: 2.5 },
          py: 1.25,
          alignItems: 'center',
          flexWrap: 'wrap',
          rowGap: 1,
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ flex: 1, minWidth: 180 }}>
          <Typography
            id="preview-title"
            variant="h6"
            component="h2"
            noWrap
            title={title}
          >
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {pages ? pageCountLabel(pages) : 'Priprema pregleda…'}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <IconButton
            aria-label="Umanji"
            onClick={() => setZoom((z) => clampZoom(z - 0.1))}
            disabled={zoom <= MIN_ZOOM}
          >
            <Typography
              component="span"
              sx={{ fontSize: 20, lineHeight: 1, width: 20 }}
            >
              −
            </Typography>
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              width: 48,
              textAlign: 'center',
              fontVariantNumeric: 'tabular-nums',
            }}
            aria-live="polite"
          >
            {Math.round(zoom * 100)}%
          </Typography>
          <IconButton
            aria-label="Uvećaj"
            onClick={() => setZoom((z) => clampZoom(z + 0.1))}
            disabled={zoom >= MAX_ZOOM}
          >
            <Typography
              component="span"
              sx={{ fontSize: 20, lineHeight: 1, width: 20 }}
            >
              +
            </Typography>
          </IconButton>
          <Button size="small" onClick={fitWidth}>
            Prilagodi širini
          </Button>
        </Stack>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: 'none', md: 'block' } }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
            />
          }
          label="Označi popunjena polja"
        />
        <Button variant="outlined" onClick={() => window.print()}>
          Štampaj
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={<Icon as={DownloadToStorageIcon} size={18} />}
        >
          Preuzmi .docx
        </Button>
        <Tooltip title="Zatvori (Esc)">
          <IconButton onClick={onClose} aria-label="Zatvori pregled">
            <Icon as={CloseLineIcon} size={18} />
          </IconButton>
        </Tooltip>
      </Stack>

      {missingFields.length > 0 && (
        <Alert severity="warning" className="no-print" sx={{ borderRadius: 0 }}>
          {missingFields.length === 1
            ? '1 polje nije popunjeno'
            : `${missingFields.length} polja nije popunjeno`}
          : {missingFields.join(', ')}
        </Alert>
      )}

      <Box
        ref={canvasRef}
        className="preview-canvas"
        sx={(t) => ({
          flex: 1,
          overflow: 'auto',
          bgcolor: alpha(
            t.palette.text.primary,
            t.palette.mode === 'dark' ? 0.04 : 0.06
          ),
          ...pageStyles(t),
        })}
      >
        <DocxViewer
          blob={highlight ? previewBlob : cleanBlob}
          zoom={zoom}
          onRendered={setPages}
        />
      </Box>
    </Dialog>
  );
};

export default DocumentPreviewDialog;
