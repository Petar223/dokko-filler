import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Mammoth from 'mammoth';
import { useEffect, useRef, useState } from 'react';

const RENDER_OPTIONS = {
  className: 'docx',
  inWrapper: true,
  breakPages: true,
  renderHeaders: true,
  renderFooters: true,
  renderFootnotes: true,
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
        const { value } = await Mammoth.convertToHtml({
          arrayBuffer: await blob.arrayBuffer(),
        });
        if (cancelled) return;
        setFallbackHtml(value);
        setStatus('fallback');
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
          <CircularProgress aria-label="Priprema pregleda" />
        </Box>
      )}
      {status === 'fallback' && (
        <>
          <Alert
            severity="warning"
            className="no-print"
            sx={{ mb: 2, mx: 'auto', maxWidth: 794 }}
          >
            Prikaz u punom formatu nije uspeo. Ispod je pojednostavljen pregled;
            preuzeti dokument je ispravno formatiran.
          </Alert>
          <section
            className="docx docx-fallback"
            // mammoth escapes all document text; output is safe markup.
            dangerouslySetInnerHTML={{ __html: fallbackHtml }}
          />
        </>
      )}
      <div ref={bodyRef} hidden={status === 'fallback'} />
    </Box>
  );
};

export default DocxViewer;
