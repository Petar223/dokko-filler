import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~context/AuthContext';
import { ROUTES } from '~utils/routes';

// ponytail: "first login" is remembered per browser and per user. Move the
// flag to a Cognito user attribute if it must follow the user across devices.
const storageKey = (user) => `dokko-tutorial-offered:${user}`;

/** Offers the guided demo once, the first time a user is logged in. */
const TutorialOffer = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [answeredFor, setAnsweredFor] = useState(null);

  const open =
    Boolean(user) &&
    answeredFor !== user &&
    !localStorage.getItem(storageKey(user));

  const answer = (startTutorial) => {
    localStorage.setItem(storageKey(user), '1');
    setAnsweredFor(user);
    if (startTutorial) navigate(ROUTES.DEMO);
  };

  return (
    <Dialog
      open={open}
      onClose={() => answer(false)}
      aria-labelledby="tutorial-offer-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="tutorial-offer-title">
        {t('tutorial.offerTitle')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('tutorial.offerText')}</DialogContentText>
        <DialogContentText variant="body2" sx={{ mt: 1.5 }}>
          {t('tutorial.offerNote')}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={() => answer(false)}>{t('tutorial.notNow')}</Button>
        <Button variant="contained" onClick={() => answer(true)}>
          {t('tutorial.start')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TutorialOffer;
