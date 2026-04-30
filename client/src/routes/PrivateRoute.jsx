import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

/**
 * Route guard for protected pages.
 * Redirects unauthenticated users to the login page while preserving
 * their attempted destination in the location state.
 */
const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate 
      to={ROUTES.LOGIN} 
      state={{ from: location }} 
      replace 
    />
  );
};

export default PrivateRoute;
