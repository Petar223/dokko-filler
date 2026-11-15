import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Mammoth from 'mammoth';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const RENDER_OPTIONS = {
  className: 'docx',
  inWrapper: true,
  breakPages: true,
  renderHeaders: true,
  renderFooters: true,
  renderFootnotes: true,
  renderEndnotes: true,
  ignoreFonts: false, // use fonts embedded in the template
  experimental: true, // real tab stops (signature lines, aligned columns)
  // Break pages where Word last broke them, so the page count matches Word.
  ignoreLastRenderedPageBreak: false,
  ignoreWidth: false,
  ignoreHeight: false,
  useBase64URL: true,
};

/**
 * Renders a .docx Blob as real pages with docx-preview (loaded lazily).
 * Falls back to a plain mammoth HTML rendering if docx-preview fails.
 */
const DocxViewer = ({ blob, zoom = 1, onRendered }) => {
  const bodyRef = useRef(null);
  const styleRef = useRef(null);
  const onRenderedRef = useRef(onRendered);
  onRenderedRef.current = onRendered;
  const [status, setStatus] = useState('rendering');
  const [fallbackHtml, setFallbackHtml] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (!blob) return undefined;
    let cancelled = false;
    const body = bodyRef.current;
    const style = styleRef.current;
    body.innerHTML = '';
    style.innerHTML = '';
    setStatus('rendering');

    (async () => {
      try {
        const { renderAsync } = await import('docx-preview');
        await renderAsync(blob, body, style, RENDER_OPTIONS);
        if (cancelled) return;
        setStatus('ready');
        onRenderedRef.current?.(body.querySelectorAll('section.docx').length);
      } catch (error) {
        console.error('docx-preview failed, using fallback', error);
        if (cancelled) return;
        try {
          const { value } = await Mammoth.convertToHtml({
            arrayBuffer: await blob.arrayBuffer(),
          });
          if (cancelled) return;
          setFallbackHtml(value);
          setStatus('fallback');
        } catch (fallbackError) {
          console.error('fallback preview failed', fallbackError);
          if (cancelled) return;
          setStatus('error');
        }
        onRenderedRef.current?.(1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [blob]);

  return (
    <Box sx={{ zoom }}>
      <div ref={styleRef} />
      {status === 'rendering' && (
        <Box sx={{ display: 'grid', placeItems: 'center', py: 10 }}>
          <CircularProgress aria-label={t('preview.preparingLabel')} />
        </Box>
      )}
      {status === 'error' && (
        <Alert severity="error" sx={{ m: 3, mx: 'auto', maxWidth: 794 }}>
          {t('preview.unavailable')}
        </Alert>
      )}
      {status === 'fallback' && (
        <>
          <Alert
            severity="warning"
            className="no-print"
            sx={{ mb: 2, mx: 'auto', maxWidth: 794 }}
          >
            {t('preview.fallback')}
          </Alert>
          <section
            className="docx docx-fallback"
            // mammoth escapes all document text; output is safe markup.
            dangerouslySetInnerHTML={{ __html: fallbackHtml }}
          />
        </>
      )}
      <div ref={bodyRef} hidden={status !== 'ready'} />
    </Box>
  );
};

export default DocxViewer;
