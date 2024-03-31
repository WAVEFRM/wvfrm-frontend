import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { convertToken, checkProfile } from '../services/api/auth-profile';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState('');
  const navigate = useNavigate();

  // const fetchGoogleProfile = async (accessToken) => {
  //   try {
  //     const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         Accept: 'application/json',
  //       },
  //     });
  //     console.log('Google Profile:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching Google profile:', error);
  //     throw new Error('Failed to fetch Google profile');
  //   }
  // };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        console.log('Google login successful');
        console.log(codeResponse);
        // Hit convert-token route to get accessToken and refreshToken
        const tokenResponse = await convertToken(codeResponse?.access_token);
        console.log(tokenResponse);
        const { access_token, refresh_token } = tokenResponse;
        setToken(access_token);
        setRefreshToken(refresh_token);

        // Hit check_profile route
        const profileResponse = await checkProfile(access_token);
        console.log(profileResponse);

        // Log if user has a profile
        if (profileResponse.has_profile) {
          console.log('Has User Profile');
        }

        // // Fetch and store Google profile
        // const googleProfile = await fetchGoogleProfile(access_token);
        // setUser(googleProfile);

        // Store access token in local storage with the key 'accessToken'
        localStorage.setItem('accessToken', access_token);

        // Navigate to home page
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
    setRefreshToken('');
    localStorage.removeItem('accessToken'); // Remove 'accessToken' from local storage
    navigate('/login');
  };

  return <AuthContext.Provider value={{ token, refreshToken, user, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
