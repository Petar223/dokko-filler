import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserError404Icon } from '~components/Icons';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import { ROUTES } from '~utils/routes';

const PageNotFound = () => {
  const { t } = useTranslation();
  return (
    <EmptyState
      icon={BrowserError404Icon}
      title={t('notFound.title')}
      description={t('notFound.description')}
      action={
        <Button component={RouterLink} to={ROUTES.HOME} variant="contained">
          {t('notFound.action')}
        </Button>
      }
    />
  );
};

export default PageNotFound;
