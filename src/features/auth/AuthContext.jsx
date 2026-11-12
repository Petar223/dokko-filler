import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUserUtil } from './authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logedIn, setLogedIn] = useState(null);

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUserUtil();
      setUser(userData.signInDetails.loginId);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser();
  }, [logedIn]);

  const login = async (logedIn) => {
    setLogedIn(logedIn);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
