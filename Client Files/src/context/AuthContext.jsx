import React, { createContext, useContext, useEffect, useState } from 'react';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

  useEffect(() => {
    setAuthToken(token);
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  function login(tkn, userData) {
    setToken(tkn);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }
  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user');
  }
  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);
