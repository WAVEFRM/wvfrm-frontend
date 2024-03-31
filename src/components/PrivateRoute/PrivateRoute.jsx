import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { BASE_URL } from '../../services/api/auth-profile';

const PrivateRoute = () => {
  const { userProfile, setUserProfile, setAccessToken, setRefreshToken } = useAuth();

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
        console.log('BBB', response);
        if (response.status === 200) {
          console.log(response.data);
          if (response.data.has_profile === true) {
            setUserProfile(response.data.user_profile);
            console.log('setting', response.data.user_profile);
          }
          setAccessToken(token);
          setRefreshToken(storedRefreshToken);
          console.log('USER IS ALREADY IN');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        // If there's an error, clear the tokens and user profile
        setAccessToken('');
        setRefreshToken('');
      }
    };

    if (storedAccessToken) {
      getCheckProfile(storedAccessToken);
    }
  }, []);

  /*
  Here is the issue, either there is an issue with dependency array or the !userProfile condition is not working as expected.
  */

  if (!userProfile) {
    console.log('User not logged in');
    return <Navigate to="/landing" />;
  }

  console.log('User logged in', userProfile);
  return <Outlet />;
};

export default PrivateRoute;
