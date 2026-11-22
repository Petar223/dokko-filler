import { STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import AppTour from '~components/AppTour/AppTour';
import { ROUTES } from '~utils/routes';
import { WELCOME_TOUR_STEPS } from './welcomeTourSteps';

/**
 * App tour shown after the first login. The first run ends with "Isprobaj
 * demo" and opens the demo; a `replay` from the user menu ends in place
 * ("Završi"), so the user never loses what they were doing.
 */
const WelcomeTour = ({ run, onEnd, replay = false }) => {
  const navigate = useNavigate();

  const handleEnd = (status) => {
    onEnd();
    if (!replay && status === STATUS.FINISHED) navigate(ROUTES.DEMO);
  };

  return (
    <AppTour
      name="welcome"
      steps={WELCOME_TOUR_STEPS}
      run={run}
      onEnd={handleEnd}
      lastKey={replay ? 'tour.last' : undefined}
    />
  );
};

export default WelcomeTour;
