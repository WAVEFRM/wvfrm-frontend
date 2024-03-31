import axios from 'axios';

const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;
const clientId = process.env.REACT_APP_DRF_CLIENT_ID;
const clientSecret = process.env.REACT_APP_DRF_CLIENT_SECRET;

const convertToken = async (token) => {
  const url = `${BASE_URL}/auth/convert-token/`;
  const body = {
    client_id: clientId,
    grant_type: 'convert_token',
    client_secret: clientSecret,
    backend: 'google-oauth2',
    token: token,
  };

  try {
    const response = await axios.post(url, body);
    return response.data;
  } catch (error) {
    console.error('Error converting token:', error);
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

export { convertToken, checkProfile };
