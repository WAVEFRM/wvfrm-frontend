import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { convertToken, checkProfile } from '../services/api/auth-profile';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = async (codeResponse) => {
    try {
      console.log('Google login successful');
      console.log(codeResponse);
      // Hit convert-token route to get accessToken and refreshToken
      const tokenResponse = await convertToken(codeResponse?.access_token);
      console.log(tokenResponse);
      const { access_token, refresh_token } = tokenResponse;
      setAccessToken(access_token);
      setRefreshToken(refresh_token);

      // Hit check_profile route
      const profileResponse = await checkProfile(access_token);
      console.log(profileResponse);

      // Store access token and refresh token in local storage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      // Log if user has a profile and navigate accordingly
      if (profileResponse.has_profile) {
        console.log('Has User Profile');
        navigate('/');
      } else {
        console.log('No User Profile');
        navigate('/signup');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: (error) => console.error('Google login failed:', error),
  });

  const logout = () => {
    setUserProfile(null);
    setAccessToken('');
    setRefreshToken('');
    localStorage.removeItem('accessToken'); // Remove 'accessToken' from local storage
    localStorage.removeItem('refreshToken'); // Remove 'refreshToken' from local storage
    navigate('/landing');
  };

  return (
    <AuthContext.Provider value={{ userProfile, accessToken, refreshToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
