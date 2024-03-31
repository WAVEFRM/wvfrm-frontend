import React, { useState, useEffect } from 'react';
import { convertToken, checkProfile } from '../../services/api/auth-profile';

const googleToken =
  'ya29.a0Ad52N381kNCLRks950LzU9geL4F0962nWb1qxdQrmLxQtlcWyB35rrK9gLIiJnXwB3AxxFjHrIzuwrMRhZBfPSnHyJN27OAcZJZA1VPM53fkNrkSgxphbxubTZZ5C6SOjsie2mU2Kzv1r_bKbSL4wDizt7878Z1IzH4aCgYKAfQSARMSFQHGX2MiU1DzdYnGbHC3a7ZJPt3YXg0170'; // Replace with your actual Google token

export default function TestPage() {
  const [checkProfileResponse, setCheckProfileResponse] = useState(null);
  const [convertedTokenResponse, setConvertedTokenResponse] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Convert Google token to access token
        const tokenResponse = await convertToken(googleToken);
        const { access_token, refresh_token } = tokenResponse;
        setConvertedTokenResponse(tokenResponse); // Set converted token response
        setAccessToken(access_token);
        setRefreshToken(refresh_token);

        // Use the obtained access token to fetch profile
        const profileResponse = await checkProfile(access_token);
        setCheckProfileResponse(profileResponse);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(checkProfileResponse);
  }, [checkProfileResponse]);

  useEffect(() => {
    console.log(convertedTokenResponse); // Log converted token response
  }, [convertedTokenResponse]);

  useEffect(() => {
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
  }, [accessToken, refreshToken]);

  return <div></div>;
}
