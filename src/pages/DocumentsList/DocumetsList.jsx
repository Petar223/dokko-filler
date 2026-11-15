import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import getDocuments from '~api/getDocuments';
import { DocumentsSearchIcon } from '~components/Icons';
import useFetch from '~hooks/useFetch';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { createDocumentPath } from '~utils/routes';

const DocumentsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(getDocuments);
  const documents = Array.isArray(data?.body) ? data.body : null;

  const content = () => {
    if (loading) return <LoadingState cards={6} cardHeight={180} />;

    if (error || !documents) {
      return (
        <EmptyState
          color="error"
          title={t('documents.listFailed')}
          description={error?.message}
          action={
            <Button variant="contained" onClick={refetch}>
              {t('common.retry')}
            </Button>
          }
        />
      );
    }

    if (!documents.length) {
      return (
        <EmptyState
          icon={DocumentsSearchIcon}
          title={t('documents.listEmpty')}
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
        title={t('documents.title')}
        subtitle={
          documents?.length
            ? `${t('documents.count', { count: documents.length })} ${t('documents.subtitle')}`
            : t('documents.subtitle')
        }
      />
      {content()}
    </>
  );
};

export default DocumentsList;
