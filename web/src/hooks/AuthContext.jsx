import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(localStorage.getItem('qa-companion-auth'));
  });

  const login = (credentials) => {
    if (credentials.username && credentials.password) {
      localStorage.setItem('qa-companion-auth', 'true');
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('qa-companion-auth');
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe utilizarse dentro de AuthProvider');
  }
  return context;
};
