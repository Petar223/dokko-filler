import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import DocumentCard from '~features/documents/DocumentCard';
import DocumentWorkspace from '~features/generate/DocumentWorkspace';
import { CardGrid } from '~ui/CardGrid';
import PageHeader from '~ui/PageHeader';
import { DEMO_DOCUMENTS, mockReadCard } from './demoData';

const DemoPage = () => {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <DocumentWorkspace
        // Remount on document change so slots start empty.
        key={selected.id}
        title={selected.name}
        neededCards={selected.neededCards}
        templateURL={selected.templateURL}
        letter={selected.letter}
        readFn={mockReadCard}
        onBack={() => setSelected(null)}
        banner={
          <Alert severity="info" sx={{ mb: 3 }}>
            <AlertTitle>Demo režim: podaci su izmišljeni</AlertTitle>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {selected.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Alert>
        }
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Demo"
        subtitle="Isprobajte ceo proces bez prijave i bez čitača kartica. Podaci se učitavaju iz unapred pripremljenih primera."
      />
      <CardGrid>
        {DEMO_DOCUMENTS.map((doc) => (
          <DocumentCard
            key={doc.id}
            name={doc.name}
            actionLabel="Pokreni demo"
            onClick={() => setSelected(doc)}
          />
        ))}
      </CardGrid>
    </>
  );
};

export default DemoPage;
