import { STATUS } from 'react-joyride';
import { useNavigate } from 'react-router-dom';
import AppTour from '~components/AppTour/AppTour';
import { ROUTES } from '~utils/routes';
import { WELCOME_TOUR_STEPS } from './welcomeTourSteps';

/**
 * App tour shown after the first login. Finishing it ("Isprobaj demo") opens
 * the demo, where the demo tour continues; skipping just closes it.
 */
const WelcomeTour = ({ run, onEnd }) => {
  const navigate = useNavigate();

  const handleEnd = (status) => {
    onEnd();
    if (status === STATUS.FINISHED) navigate(ROUTES.DEMO);
  };

  return (
    <AppTour
      name="welcome"
      steps={WELCOME_TOUR_STEPS}
      run={run}
      onEnd={handleEnd}
    />
  );
};

export default WelcomeTour;
