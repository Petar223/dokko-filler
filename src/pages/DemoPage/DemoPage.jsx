import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import DocumentWorkspace from '~components/DocumentWorkspace/DocumentWorkspace';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { ROUTES } from '~utils/routes';
import { DEMO_DOCUMENTS, mockReadCard } from './demoData';

// Step ids; copy is in the locale files under `tutorial.steps.<id>`.
const STEPS = ['choose', 'load', 'preview'];

/** Tutorial strip: where the user is in the flow and what to do next. */
const DemoGuide = ({ step }) => {
  const { t } = useTranslation();
  const done = step >= STEPS.length;
  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, sm: 3 }, mb: 3, textAlign: 'center' }}
    >
      <Stepper activeStep={step} alternativeLabel sx={{ mb: 2 }}>
        {STEPS.map((id) => (
          <Step key={id}>
            <StepLabel>{t(`tutorial.steps.${id}.label`)}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography aria-live="polite" sx={{ maxWidth: 680, mx: 'auto' }}>
        {done ? t('tutorial.done') : t(`tutorial.steps.${STEPS[step]}.hint`)}
      </Typography>
      {done ? (
        <Button
          component={Link}
          to={ROUTES.DOCUMENTS}
          variant="contained"
          sx={{ mt: 2 }}
        >
          {t('tutorial.goToContracts')}
        </Button>
      ) : (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 1 }}
        >
          {t('tutorial.demoNote')}
        </Typography>
      )}
    </Paper>
  );
};

const DemoPage = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  if (selected) {
    return (
      <DocumentWorkspace
        // Remount on document change so slots start empty.
        key={selected.id}
        title={t(selected.name)}
        neededCards={selected.neededCards.map((card) => ({
          ...card,
          name: t(card.name),
        }))}
        templateURL={selected.templateURL}
        letter={selected.letter}
        readFn={mockReadCard}
        onBack={() => setSelected(null)}
        banner={({ allLoaded, previewed }) => (
          <DemoGuide step={previewed ? 3 : allLoaded ? 2 : 1} />
        )}
      />
    );
  }

  return (
    <>
      <PageHeader title={t('demo.title')} subtitle={t('demo.subtitle')} />
      <DemoGuide step={0} />
      <CardGrid>
        {DEMO_DOCUMENTS.map((doc) => (
          <DocumentItem
            key={doc.id}
            name={t(doc.name)}
            actionLabel={t('demo.run')}
            onClick={() => setSelected(doc)}
          />
        ))}
      </CardGrid>
    </>
  );
};

export default DemoPage;
