import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import getDocuments from '~api/getDocuments';
import { DocumentsSearchIcon } from '~components/Icons';
import useFetch from '~hooks/useFetch';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { MSG } from '~utils/messages';
import { createDocumentPath } from '~utils/routes';

const DocumentsList = () => {
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
          <DocumentItem
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

export default DocumentsList;
