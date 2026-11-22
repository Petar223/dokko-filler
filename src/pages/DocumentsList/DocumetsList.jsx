import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import getDocuments from '~api/getDocuments';
import AppTour from '~components/AppTour/AppTour';
import { DocumentsSearchIcon } from '~components/Icons';
import useFetch from '~hooks/useFetch';
import useTour from '~hooks/useTour';
import DocumentItem from '~shared-components/DocumentItem/DocumentItem';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import PageHeader from '~shared-components/PageHeader/PageHeader';
import { CardGrid } from '~shared-components/shared-styled-components/CardGrid/CardGrid';
import { createDocumentPath } from '~utils/routes';
import { DOCUMENTS_TOUR_STEPS } from './documentsTour';

const DocumentsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useFetch(getDocuments);
  const documents = Array.isArray(data?.body) ? data.body : null;
  const tour = useTour('documents', { autoStart: true });
  // The tour points at the first contract, so it needs a non-empty list.
  const hasDocuments = Boolean(documents?.length);

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
      <CardGrid data-tour="documents-list">
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
        actions={
          hasDocuments && (
            <Button variant="outlined" onClick={tour.start}>
              {t('tour.replay')}
            </Button>
          )
        }
        subtitle={
          documents?.length
            ? `${t('documents.count', { count: documents.length })} ${t('documents.subtitle')}`
            : t('documents.subtitle')
        }
      />
      {content()}
      {hasDocuments && (
        <AppTour
          name="documents"
          steps={DOCUMENTS_TOUR_STEPS}
          run={tour.run}
          onEnd={tour.end}
        />
      )}
    </>
  );
};

export default DocumentsList;
