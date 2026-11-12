import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { getDocuments } from '~api/documents';
import { MSG } from '~constants/messages';
import { createDocumentPath } from '~constants/routes';
import useFetch from '~hooks/useFetch';
import { CardGrid } from '~ui/CardGrid';
import EmptyState from '~ui/EmptyState';
import { DocumentsSearchIcon } from '~ui/Icons';
import LoadingState from '~ui/LoadingState';
import PageHeader from '~ui/PageHeader';
import DocumentCard from './DocumentCard';

const DocumentsListPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(getDocuments);
  const documents = Array.isArray(data?.body) ? data.body : null;

  const content = () => {
    if (loading) return <LoadingState cards={6} cardHeight={180} />;

    if (error || !documents) {
      return (
        <EmptyState
          color="error"
          title={MSG.documents.listFailed}
          description={error?.message}
          action={
            <Button variant="contained" onClick={refetch}>
              Pokušaj ponovo
            </Button>
          }
        />
      );
    }

    if (!documents.length) {
      return (
        <EmptyState
          icon={DocumentsSearchIcon}
          title={MSG.documents.listEmpty}
        />
      );
    }

    return (
      <CardGrid>
        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            name={doc.name}
            onClick={() => navigate(createDocumentPath(doc.id))}
          />
        ))}
      </CardGrid>
    );
  };

  return (
    <>
      <PageHeader
        title="Ugovori"
        subtitle={
          documents?.length
            ? `${documents.length} dostupnih šablona. Izaberite ugovor koji želite da popunite.`
            : 'Izaberite ugovor koji želite da popunite.'
        }
      />
      {content()}
    </>
  );
};

export default DocumentsListPage;
