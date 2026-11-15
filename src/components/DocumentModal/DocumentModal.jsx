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
import { useTranslation } from 'react-i18next';
import DocxViewer from '~components/DocxViewer/DocxViewer';
import { CloseLineIcon, DownloadToStorageIcon } from '~components/Icons';
import Icon from '~shared-components/Icon/Icon';
import { downloadBlob } from '~utils/fileDownloader';

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2;
const clampZoom = (z) =>
  Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100));

// Space around each page on the canvas (theme spacing units).
const PAGE_GAP = 3;
// Margin between the dialog and the window edge (theme spacing units).
const DIALOG_MARGIN = { xs: 1, sm: 4 };

const pageStyles = (theme) => ({
  // docx-preview wrapper: transparent so our canvas color shows through.
  '.docx-wrapper': {
    background: 'transparent !important',
    padding: `${theme.spacing(PAGE_GAP)} !important`,
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(2)} !important`,
    },
  },
  // Paper stays white in dark mode too: this is what gets printed.
  'section.docx': {
    background: '#fff',
    color: '#000',
    // Word's default when the template sets no font; without this the page
    // would inherit the app font and not match the downloaded file.
    fontFamily: '"Times New Roman", Times, serif',
    fontSize: '10pt',
    // Isolate the page from the app: text the template does not style must
    // fall back to Word's defaults, not to the app typography or dark mode.
    fontWeight: 400,
    fontStyle: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    textAlign: 'start',
    textTransform: 'none',
    fontFeatureSettings: 'normal',
    fontVariantNumeric: 'normal',
    colorScheme: 'light',
    boxShadow: '0 2px 12px rgba(15, 23, 42, 0.18) !important',
    marginBottom: `${theme.spacing(PAGE_GAP)} !important`,
  },
  '.docx-fallback': {
    maxWidth: 794,
    minHeight: 1123,
    margin: `${theme.spacing(PAGE_GAP)} auto`,
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
            margin: '0 !important',
            width: 'auto !important',
            maxHeight: 'none !important',
            border: 'none !important',
            boxShadow: 'none !important',
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

const DocumentModal = ({
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
  const { t } = useTranslation();
  const canvasRef = useRef(null);

  const fitWidth = () => {
    const page = canvasRef.current?.querySelector('section.docx');
    if (!page) return;
    const pageWidth = page.getBoundingClientRect().width / zoom;
    // Zoom scales the gap too; 16px is left for the scrollbar.
    const gap = PAGE_GAP * 8 * 2;
    setZoom(
      clampZoom((canvasRef.current.clientWidth - 16) / (pageWidth + gap))
    );
  };

  const handleDownload = () => downloadBlob(cleanBlob, `${title}.docx`);

  return (
    <Dialog
      maxWidth={false}
      PaperProps={{
        sx: (t) => ({
          m: DIALOG_MARGIN,
          width: {
            xs: `calc(100% - ${t.spacing(DIALOG_MARGIN.xs * 2)})`,
            sm: `calc(100% - ${t.spacing(DIALOG_MARGIN.sm * 2)})`,
          },
          height: {
            xs: `calc(100% - ${t.spacing(DIALOG_MARGIN.xs * 2)})`,
            sm: `calc(100% - ${t.spacing(DIALOG_MARGIN.sm * 2)})`,
          },
          maxHeight: 'none',
          overflow: 'hidden',
        }),
      }}
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
            {pages
              ? t('preview.pages', { count: pages })
              : t('preview.preparing')}
          </Typography>
        </Box>

        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <IconButton
            aria-label={t('preview.zoomOut')}
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
            aria-label={t('preview.zoomIn')}
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
            {t('preview.fitWidth')}
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
          label={t('preview.highlight')}
        />
        <Button variant="outlined" onClick={() => window.print()}>
          {t('preview.print')}
        </Button>
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={<Icon as={DownloadToStorageIcon} size={18} />}
        >
          {t('preview.download')}
        </Button>
        <Tooltip title={t('preview.closeHint')}>
          <IconButton onClick={onClose} aria-label={t('preview.close')}>
            <Icon as={CloseLineIcon} size={18} />
          </IconButton>
        </Tooltip>
      </Stack>

      {missingFields.length > 0 && (
        <Alert severity="warning" className="no-print" sx={{ borderRadius: 0 }}>
          {t('preview.missing', {
            count: missingFields.length,
            fields: missingFields.join(', '),
          })}
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

export default DocumentModal;
