import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DocumentModal from '~components/DocumentModal/DocumentModal';
import DocumentRender from '~components/DocumentRender/DocumentRender';
import { OverviewIcon } from '~components/Icons';
import useCardSlots from '~hooks/useCardSlots';
import useDocumentGeneration, {
  GENERATION_STATUS,
} from '~hooks/useDocumentGeneration';
import Icon from '~shared-components/Icon/Icon';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';

/**
 * Shared "load cards -> preview -> download" screen for real and demo flows.
 * `readFn(order)` returns a card snapshot (real reader or demo mock).
 */
const DocumentWorkspace = ({
  title,
  neededCards,
  templateURL,
  letter,
  readFn,
  onBack,
  banner,
}) => {
  const { snapshots, fields, loadingOrder, loadCard, removeCard } =
    useCardSlots(readFn);
  const generation = useDocumentGeneration({ templateURL, fields, letter });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewed, setPreviewed] = useState(false);
  const { t } = useTranslation();

  const loadedCount = neededCards.filter((c) => snapshots[c.order]).length;
  const allLoaded = loadedCount === neededCards.length;
  const generating = generation.status === GENERATION_STATUS.GENERATING;

  const handlePreview = async () => {
    if (!(await generation.generate())) return;
    setPreviewOpen(true);
    setPreviewed(true);
  };

  const previewButton = (
    <Button
      variant="contained"
      size="large"
      onClick={handlePreview}
      disabled={!allLoaded || generating}
      startIcon={
        generating ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <Icon as={OverviewIcon} size={18} />
        )
      }
    >
      {t('workspace.preview')}
    </Button>
  );

  return (
    <>
      <PageHeader
        title={title}
        onBack={onBack}
        actions={
          allLoaded ? (
            previewButton
          ) : (
            <Tooltip title={t('workspace.loadAllFirst')}>
              {/* span: disabled buttons don't fire tooltip events */}
              <span>{previewButton}</span>
            </Tooltip>
          )
        }
      />

      {/* A function banner gets the progress (the demo tutorial uses it). */}
      {typeof banner === 'function' ? banner({ allLoaded, previewed }) : banner}

      <Stack spacing={1} sx={{ mb: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h2">
            {t('workspace.loadTitle')}
          </Typography>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            {t('workspace.loadedCount', {
              loaded: loadedCount,
              total: neededCards.length,
            })}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={
            neededCards.length ? (loadedCount / neededCards.length) * 100 : 0
          }
          aria-label={t('workspace.progress')}
        />
      </Stack>

      <CardGrid $min={300}>
        {neededCards.map((card) => (
          <DocumentRender
            key={card.order}
            card={card}
            snapshot={snapshots[card.order]}
            loading={loadingOrder === card.order}
            disabled={loadingOrder !== null}
            onLoad={() => loadCard(card)}
            onRemove={() => removeCard(card.order)}
          />
        ))}
      </CardGrid>

      <DocumentModal
        open={previewOpen && generation.status === GENERATION_STATUS.READY}
        onClose={() => setPreviewOpen(false)}
        title={title}
        previewBlob={generation.previewBlob}
        downloadBlob={generation.downloadBlob}
        missingFields={generation.missingFields}
      />
    </>
  );
};

export default DocumentWorkspace;
