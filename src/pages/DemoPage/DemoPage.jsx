import Button from '@mui/material/Button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AppTour from '~components/AppTour/AppTour';
import DocumentWorkspace from '~components/DocumentWorkspace/DocumentWorkspace';
import useTour from '~hooks/useTour';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { ROUTES } from '~utils/routes';
import { DEMO_DOCUMENTS, mockReadCard } from './demoData';
import { DEMO_LIST_STEPS } from './demoTours';

const DemoPage = () => {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();
  // The list has its own tour; the workspace runs its own (`demoWorkspace`).
  const listTour = useTour(selected ? null : 'demo-list', { autoStart: true });

  const openDemo = (doc) => {
    // The tour asks for exactly this click; leaving counts as having seen it.
    if (listTour.run) listTour.end();
    setSelected(doc);
  };

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
        tourName="demoWorkspace"
        actions={
          <Button component={Link} to={ROUTES.DOCUMENTS} size="large">
            {t('demo.goToContracts')}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title={t('demo.title')}
        subtitle={t('demo.subtitle')}
        actions={
          <Button variant="outlined" onClick={listTour.start}>
            {t('tour.replay')}
          </Button>
        }
      />
      <CardGrid data-tour="demo-contracts">
        {DEMO_DOCUMENTS.map((doc) => (
          <DocumentItem
            key={doc.id}
            name={t(doc.name)}
            actionLabel={t('demo.run')}
            onClick={() => openDemo(doc)}
          />
        ))}
      </CardGrid>
      <AppTour
        name="demoList"
        steps={DEMO_LIST_STEPS}
        run={listTour.run}
        onEnd={listTour.end}
      />
    </>
  );
};

export default DemoPage;
