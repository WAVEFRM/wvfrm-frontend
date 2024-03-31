import axios from 'axios';

const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;
const clientId = process.env.REACT_APP_DRF_CLIENT_ID;
const clientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;

const convertToken = async (googleAccessToken) => {
  const url = `${BASE_URL}/auth/convert-token/`;
  const body = {
    grant_type: 'convert_token',
    client_id: clientId,
    client_secret: clientSecret,
    backend: 'google-oauth2',
    token: googleAccessToken,
  };

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error('Error converting google access token:', error);
  }
};

const convertRefreshToken = async (refreshToken) => {
  const url = `${BASE_URL}/auth/token/`;
  const body = {
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  };

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error('Error converting refresh token:', error);
  }
};

const checkProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/check_profile/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

export { convertToken, convertRefreshToken, checkProfile };
