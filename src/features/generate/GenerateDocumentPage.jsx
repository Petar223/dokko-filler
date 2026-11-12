import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { readCard } from '~api/cardReader';
import { getDocumentById } from '~api/documents';
import { MSG } from '~constants/messages';
import { ROUTES } from '~constants/routes';
import useFetch from '~hooks/useFetch';
import EmptyState from '~ui/EmptyState';
import LoadingState from '~ui/LoadingState';
import DocumentWorkspace from './DocumentWorkspace';

// The real reader returns whatever card is inserted; the slot order is
// irrelevant for it.
const readFromReader = () => readCard();

const GenerateDocumentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fetchDocument = useCallback(() => getDocumentById(id), [id]);
  const { data, loading, error, refetch } = useFetch(fetchDocument);
  const contract = data?.body;
  const backToList = () => navigate(ROUTES.DOCUMENTS);

  if (loading) return <LoadingState />;

  if (error || !contract?.document_url_docx) {
    return (
      <EmptyState
        color="error"
        title={MSG.documents.documentFailed}
        description={error?.message}
        action={
          <>
            <Button variant="contained" onClick={refetch}>
              Pokušaj ponovo
            </Button>
            <Button onClick={backToList}>Nazad na ugovore</Button>
          </>
        }
      />
    );
  }

  return (
    <DocumentWorkspace
      title={contract.name}
      neededCards={contract.needed_cards ?? []}
      templateURL={contract.document_url_docx}
      letter={contract.letter}
      readFn={readFromReader}
      onBack={backToList}
    />
  );
};

export default GenerateDocumentPage;
