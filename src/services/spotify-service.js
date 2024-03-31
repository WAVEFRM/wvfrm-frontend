import axios from 'axios';

const SPOTIFY_CONFIG = {
  tokenUrl: process.env.REACT_APP_SPOTIFY_TOKEN_URL,
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN,
  searchUrl: process.env.REACT_APP_SPOTIFY_SEARCH_URL,
};

const getSpotifyAccessTokenFromRefresh = async () => {
  const { tokenUrl, clientId, clientSecret, refreshToken } = SPOTIFY_CONFIG;

  try {
    const formData = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    });

    const response = await axios.post(tokenUrl, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const spotifyAccessToken = response.data.access_token;
    return spotifyAccessToken;
  } catch (error) {
    throw error;
  }
};

const fetchSpotifyData = async (spotifyAccessToken, url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${spotifyAccessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const newReleases = async (spotifyAccessToken, options = {}) => {
  const { market = 'US', limit = 12, offset = 0 } = options;
  const url = `https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=${limit}&offset=${offset}`;

  try {
    return await fetchSpotifyData(spotifyAccessToken, url);
  } catch (error) {
    throw error;
  }
};

const searchTrack = async (spotifyAccessToken, query, options = {}) => {
  const { searchUrl } = SPOTIFY_CONFIG;
  const { offset = 0, limit = 6, market = 'US' } = options;
  const url = `${searchUrl}?q=${query}&type=track&market=${market}&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    const searchItems = response.tracks?.items;
    const trackNames = searchItems.map((item) => item.name);
    return trackNames;
  } catch (error) {
    throw error;
  }
};

export { SPOTIFY_CONFIG, getSpotifyAccessTokenFromRefresh, newReleases, searchTrack };
