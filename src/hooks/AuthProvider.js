import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { convertToken, checkProfile } from '../services/api/auth-profile';
import axios from 'axios';

const AuthContext = createContext();

const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;

const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState('');
  const [hasProfile, setHasProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Has Profile Changed!!!:', hasProfile);
  }, [hasProfile]);

  useEffect(() => {
    console.log('isLoggedIn Profile Changed!!!:', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken') || '';
    const storedRefreshToken = localStorage.getItem('refreshToken') || '';

    const getCheckProfile = async (token) => {
      try {
        const response = await axios.get(`${BASE_URL}/profile/check_profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (response.status === 200) {
          setUserProfile(response.data.user_profile);
          setAccessToken(token);
          setRefreshToken(storedRefreshToken);
          setHasProfile(response.data.has_profile);
          setIsLoggedIn(true); // Set isLoggedIn to true
          console.log('USER IS ALREADY IN');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (storedAccessToken) {
      getCheckProfile(storedAccessToken);
    }
  }, []);

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
        setUserProfile(profileResponse.user_profile);
        setHasProfile(true);
      } else {
        console.log('No User Profile');
        setUserProfile(null);
        setHasProfile(false);
      }

      setIsLoggedIn(true); // Set isLoggedIn to true
      navigate('/');
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
    setHasProfile(false);
    setIsLoggedIn(false); // Set isLoggedIn to false on logout
    navigate('/landing');
  };

  return (
    <AuthContext.Provider
      value={{
        userProfile,
        accessToken,
        refreshToken,
        hasProfile,
        isLoggedIn,
        setUserProfile,
        setAccessToken,
        setRefreshToken,
        setHasProfile,
        setIsLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
