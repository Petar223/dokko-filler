import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserError404Icon } from '~components/Icons';
import EmptyState from '~shared-components/EmptyState/EmptyState';
import { ROUTES } from '~utils/routes';

const PageNotFound = () => (
  <EmptyState
    icon={BrowserError404Icon}
    title="Stranica nije pronađena"
    description="Adresa koju ste otvorili ne postoji ili je premeštena."
    action={
      <Button component={RouterLink} to={ROUTES.HOME} variant="contained">
        Idi na početak
      </Button>
    }
  />
);

export default PageNotFound;
