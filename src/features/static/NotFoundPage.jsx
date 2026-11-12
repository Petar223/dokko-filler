import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import { ROUTES } from '~constants/routes';
import EmptyState from '~ui/EmptyState';
import { BrowserError404Icon } from '~ui/Icons';

const NotFoundPage = () => (
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

export default NotFoundPage;
