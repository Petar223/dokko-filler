import Button from '@mui/material/Button';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import getDocumentById from '~api/getDocumentById';
import read from '~api/read';
import DocumentWorkspace from '~components/DocumentWorkspace/DocumentWorkspace';
import useFetch from '~hooks/useFetch';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import { ROUTES } from '~utils/routes';

// The real reader returns whatever card is inserted; the slot order is
// irrelevant for it.
const readFromReader = () => read();

const GenerateDocumentPage = () => {
  const { t } = useTranslation();
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
        title={t('documents.documentFailed')}
        description={error?.message}
        action={
          <>
            <Button variant="contained" onClick={refetch}>
              {t('common.retry')}
            </Button>
            <Button onClick={backToList}>{t('documents.backToList')}</Button>
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
