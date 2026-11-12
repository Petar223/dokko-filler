import { useCallback, useRef, useState } from 'react';
import { inflect } from '~api/cases';
import { useNotification } from '~app/Notifications';
import { MSG } from '~constants/messages';
import { TemplateFetchError, fetchTemplate } from '~lib/document/download';
import { addCustomFields, fillDocument } from '~lib/document/fillDocument';
import {
  extractPlaceholderNames,
  extractText,
  getCaseRequests,
  getMissingFields,
} from '~lib/document/placeholders';

export const GENERATION_STATUS = {
  IDLE: 'idle',
  GENERATING: 'generating',
  READY: 'ready',
  ERROR: 'error',
};

/**
 * Template -> filled .docx. Produces two blobs from one patch run:
 * `downloadBlob` (clean) and `previewBlob` (filled values highlighted).
 */
const useDocumentGeneration = ({ templateURL, fields, letter }) => {
  const notify = useNotification();
  const [state, setState] = useState({ status: GENERATION_STATUS.IDLE });
  // Only successful downloads are cached, so a failed (e.g. expired) URL is
  // fetched again on the next attempt.
  const templateCache = useRef({ url: null, bytes: null });

  const generate = useCallback(async () => {
    setState((prev) => ({ ...prev, status: GENERATION_STATUS.GENERATING }));
    try {
      if (templateCache.current.url !== templateURL) {
        templateCache.current = {
          url: templateURL,
          bytes: await fetchTemplate(templateURL),
        };
      }
      const { bytes } = templateCache.current;

      const names = extractPlaceholderNames(await extractText(bytes));
      const enriched = addCustomFields(fields, letter);
      const inflected = await Promise.all(
        getCaseRequests(names, enriched).map(async (req) => [
          req.placeholder,
          await inflect(req),
        ])
      );
      const allFields = { ...enriched, ...Object.fromEntries(inflected) };

      const [downloadBlob, previewBlob] = await Promise.all([
        fillDocument(bytes, allFields),
        fillDocument(bytes, allFields, { highlight: 'yellow' }),
      ]);

      setState({
        status: GENERATION_STATUS.READY,
        downloadBlob,
        previewBlob,
        missingFields: getMissingFields(names, allFields),
      });
    } catch (error) {
      console.error(error);
      setState({ status: GENERATION_STATUS.ERROR });
      notify(
        error instanceof TemplateFetchError
          ? MSG.documents.templateFailed
          : MSG.documents.generateFailed,
        'error'
      );
    }
  }, [templateURL, fields, letter, notify]);

  const reset = useCallback(
    () => setState({ status: GENERATION_STATUS.IDLE }),
    []
  );

  return {
    ...state,
    missingFields: state.missingFields ?? [],
    generate,
    reset,
  };
};

export default useDocumentGeneration;
