import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('site') || '');
  const navigate = useNavigate();

  const fetchGoogleProfile = async (accessToken) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });
      console.log('Google Profile:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching Google profile:', error);
      throw new Error('Failed to fetch Google profile');
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        console.log('Google login successful');
        // You may want to perform additional actions after successful login
        setToken(codeResponse.access_token);
        const profile = await fetchGoogleProfile(codeResponse.access_token);
        setUser(profile);
        localStorage.setItem('site', codeResponse.access_token);
        console.log(codeResponse);
        navigate('/');
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: (error) => console.error('Google login failed:', error),
  });

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('site');
    navigate('/login');
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return React.useContext(AuthContext);
};
