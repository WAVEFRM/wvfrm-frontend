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

const createProfile = async (accessToken, profileData) => {
  try {
    const response = await axios.post(`${BASE_URL}/profile/create_profile/`, profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('ooooofoofoofof', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};

const viewProfile = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/view_profile/`, {
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
const editProfile = async (accessToken, profileData) => {
  try {
    console.log(profileData,'oooojjjjdsjdjasjdasd')
    const response = await axios.put(`${BASE_URL}/profile/edit_profile/`, profileData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('ooooofoofoofof', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating profile:', error);
  }
};
export { convertToken, convertRefreshToken, checkProfile, createProfile, viewProfile, editProfile };
