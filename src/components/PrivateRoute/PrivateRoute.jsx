import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';

const PrivateRoute = () => {
  const { userProfile } = useAuth();

  if (userProfile === null) {
    console.log('User not logged in');
    return <Navigate to="/landing" />;
  }

  console.log('User logged in', userProfile);
  return <Outlet />;
};

export default PrivateRoute;
