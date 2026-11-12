import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AUTH_STATUS, useAuth } from '~context/AuthContext';
import LoadingState from '~shared-components/LoadingState/LoadingState';
import { ROUTES } from '~utils/routes';

const PrivateRoute = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === AUTH_STATUS.LOADING) return <LoadingState />;

  if (status === AUTH_STATUS.ANONYMOUS) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
