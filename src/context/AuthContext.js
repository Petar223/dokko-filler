import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getCurrentUserEmail, signOutUser } from '~utils/cognitoAuth';

export const AUTH_STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  ANONYMOUS: 'anonymous',
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(AUTH_STATUS.LOADING);

  // Single source of truth: always re-read the user from Cognito.
  const refreshUser = useCallback(async () => {
    const email = await getCurrentUserEmail();
    setUser(email);
    setStatus(email ? AUTH_STATUS.AUTHENTICATED : AUTH_STATUS.ANONYMOUS);
    return email;
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    await signOutUser();
    setUser(null);
    setStatus(AUTH_STATUS.ANONYMOUS);
  }, []);

  const value = useMemo(
    () => ({ user, status, login: refreshUser, logout }),
    [user, status, refreshUser, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
