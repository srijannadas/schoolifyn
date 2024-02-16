// AuthContext.js
import { type } from '@testing-library/user-event/dist/type';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);

  const setAuthToken = (newToken) => {
    setToken(newToken);
    Cookies.set('token', newToken, { expires: 1 });
  };
  const getUsernameFromToken = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.username;
    }
    return null;
  };
  const handleLogout = () => {
    setAuthToken(null);
  };
  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setAuthToken,handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
