// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useGoogleLogin } from '@react-oauth/google';
// import GoogleButton from 'react-google-button';
// import './LoginButton.css';

// export default function LoginButton() {
//   const [googleAuthToken, setGoogleAuthToken] = useState([]);
//   const [googleProfile, setGoogleProfile] = useState([]);
//   const [profile, setProfile] = useState([]);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => {
//       setGoogleAuthToken(codeResponse);
//     },
//     onError: (error) => console.log('Login Failed:', error),
//   });

//   useEffect(() => {
//     const fetchGoogleProfile = async () => {
//       try {
//         if (googleAuthToken) {
//           const response = await axios.get(
//             `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleAuthToken.access_token}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${googleAuthToken.access_token}`,
//                 Accept: 'application/json',
//               },
//             }
//           );
//           setGoogleProfile(response.data);
//           console.log('Response from Google:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching Google profile:', error);
//       }
//     };

//     fetchGoogleProfile();
//   }, [googleAuthToken]);

//   return (
//     <div className="loginbtn">
//       <button type="button" class="google-sign-in-button" onClick={login}>
//         Sign in with Google
//       </button>
//     </div>
//     // <GoogleButton
//     //   type="dark" // can be light or dark
//     //   onClick={() => {
//     //     console.log('Google button clicked');
//     //   }}
//     // />
//   );
// }

import React from 'react';
import { useAuth } from '../../hooks/AuthProvider'; // Adjust the path as per your project structure
import GoogleButton from 'react-google-button';

const LoginButton = () => {
  // Access the login function from useAuth hook
  const { login, logout } = useAuth();

  return (
    <div className="loginbtn">
      <GoogleButton
        onClick={() => {
          // Call the login function when the Google button is clicked
          login();
        }}
      />
    </div>
  );
};

export default LoginButton;
