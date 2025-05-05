import React, { createContext, useState, useContext } from 'react';
import { login as loginAPI, register as registerAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const res = await loginAPI(credentials);
      setUser(res.data.user);
      if (res.data.user.role === 'admin') navigate('/admin');
      else if (res.data.user.role === 'owner') navigate('/owner');
      else navigate('/user');
    } catch (err) {
      console.error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userInfo) => {
    try {
      const res = await registerAPI(userInfo);
      setUser(res.data.user);
      navigate('/user');
    } catch (err) {
      console.error(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
