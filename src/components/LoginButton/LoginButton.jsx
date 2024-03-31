import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
import './LoginButton.css';

function LoginButton() {
  const { login, logout } = useAuth();

  return (
    <div className="loginbtn">
      <button type="button" className="google-sign-in-button" onClick={login}>
        Sign in with Google
      </button>
    </div>
    // <GoogleButton
    //   type="dark" // can be light or dark
    //   onClick={() => {
    //     console.log('Google button clicked');
    //   }}
    // />
  );
}

export default LoginButton;
