import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { BASE_URL } from '../../services/api/auth-profile';
import Loading from '../Loading/Loading';

const PrivateRoute = () => {
  const { userProfile, setUserProfile, setAccessToken, setRefreshToken, logout } = useAuth();
  const [profileCheckComplete, setProfileCheckComplete] = useState(false);

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
          if (response.data.has_profile === true) {
            setUserProfile(response.data.user_profile);
          }
          setAccessToken(token);
          setRefreshToken(storedRefreshToken);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If there's an error, clear the tokens and user profile
        logout();
      } finally {
        // Set profile check as complete after the request is finished
        setProfileCheckComplete(true);
      }
    };

    const checkProfileAndSetTokens = async () => {
      if (storedAccessToken) {
        await getCheckProfile(storedAccessToken);
      } else {
        // If no access token is found, set profile check as complete
        setProfileCheckComplete(true);
      }
    };

    checkProfileAndSetTokens();
  }, [setUserProfile, setAccessToken, setRefreshToken]);

  if (!profileCheckComplete) {
    // If profile check is not complete, show loading or some other indication
    return <Loading />;
  }

  if (!userProfile) {
    console.log('User not logged in');
    return <Navigate to="/landing" />;
  }

  console.log('User logged in', userProfile);
  return <Outlet />;
};

export default PrivateRoute;
