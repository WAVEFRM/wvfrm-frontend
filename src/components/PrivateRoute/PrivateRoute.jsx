import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../hooks/AuthProvider';
import Loading from '../Loading/Loading';

const PrivateRoute = () => {
  const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;

  const {
    hasProfile,
    isLoggedIn,
    setUserProfile,
    setAccessToken,
    setRefreshToken,
    setHasProfile,
    setIsLoggedIn,
    logout,
  } = useAuth();
  const [profileCheckComplete, setProfileCheckComplete] = useState(false);
  const location = useLocation();

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
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If there's an error, clear the tokens and user profile
        console.log('ROROORRORORO');
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
  }, []);

  if (!profileCheckComplete) {
    // If profile check is not complete, show loading or some other indication
    return <Loading />;
  }

  if (!isLoggedIn) {
    // If not logged in, redirect to landing
    return <Navigate to="/landing" />;
  }

  if (!hasProfile && location.pathname !== '/signup') {
    // If logged in but has no profile and not on the signup page, redirect to the signup page
    console.log('NO PROFILE, REDIRECTING TO SIGNUP');
    return <Navigate to="/signup" />;
  }

  if (hasProfile && location.pathname === '/signup') {
    // If logged in and has a profile but on the signup page, redirect to the home page
    console.log('HAS PROFILE, REDIRECTING TO HOME');
    return <Navigate to="/" />;
  }

  // Render protected routes if logged in and has a profile, or if already on the signup page
  return <Outlet />;
};

export default PrivateRoute;
