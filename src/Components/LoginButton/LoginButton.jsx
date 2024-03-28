import React, {useState, useEffect } from 'react'
import googleLogo from "../../Assets/googleLogo.png";
import { useGoogleLogin } from "@react-oauth/google";
import axios from 'axios';

import './LoginButton.css';
const LoginButton = () => {
  
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {setUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error)
  });

  useEffect(() => {
    if (user) {
      axios
      .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
          <div className="LoginButtonContainer">
            <button
              type="button"
              className="LoginButton"
              onClick={() => login()}
            >
            <img className="googleLogo" src={googleLogo}></img>
            <h2>Sign in with Google</h2>  
            </button>
          </div>
  );
};

export default LoginButton;