import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '~constants/routes';
import { AUTH_STATUS, useAuth } from '~features/auth/AuthContext';
import LoadingState from '~ui/LoadingState';

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
