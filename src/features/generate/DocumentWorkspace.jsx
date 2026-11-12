import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import DocumentPreviewDialog from '~features/preview/DocumentPreviewDialog';
import useDocumentGeneration, {
  GENERATION_STATUS,
} from '~features/preview/useDocumentGeneration';
import { CardGrid } from '~ui/CardGrid';
import Icon from '~ui/Icon';
import { OverviewIcon } from '~ui/Icons';
import PageHeader from '~ui/PageHeader';
import CardSlot from './CardSlot';
import useCardSlots from './useCardSlots';

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

  const loadedCount = neededCards.filter((c) => snapshots[c.order]).length;
  const allLoaded = loadedCount === neededCards.length;
  const generating = generation.status === GENERATION_STATUS.GENERATING;

  const handlePreview = async () => {
    if (await generation.generate()) setPreviewOpen(true);
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
      Pregledaj dokument
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
            <Tooltip title="Prvo učitajte sve potrebne dokumente">
              {/* span: disabled buttons don't fire tooltip events */}
              <span>{previewButton}</span>
            </Tooltip>
          )
        }
      />

      {banner}

      <Stack spacing={1} sx={{ mb: 3 }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="h2">
            Učitajte potrebna dokumenta
          </Typography>
          <Typography color="text.secondary" sx={{ fontWeight: 600 }}>
            Učitano {loadedCount}/{neededCards.length}
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={
            neededCards.length ? (loadedCount / neededCards.length) * 100 : 0
          }
          aria-label="Napredak učitavanja"
        />
      </Stack>

      <CardGrid $min={300}>
        {neededCards.map((card) => (
          <CardSlot
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

      <DocumentPreviewDialog
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
