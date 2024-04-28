import axios from 'axios';

const SPOTIFY_CONFIG = {
  tokenUrl: process.env.REACT_APP_SPOTIFY_TOKEN_URL,
  clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  refreshToken: process.env.REACT_APP_SPOTIFY_REFRESH_TOKEN,
  searchUrl: process.env.REACT_APP_SPOTIFY_SEARCH_URL,
  artistUrl: process.env.REACT_APP_SPOTIFY_ARTIST_URL,
  trackUrl: process.env.REACT_APP_SPOTIFY_TRACK_URL,
  audioFeaturesUrl: process.env.REACT_APP_SPOTIFY_AUDIO_FEATURES_URL,
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
const similarSongs = async (spotifyAccessToken, seed_artist, seed_track, seed_genres, options = {}) => {
  const { limit = 6, market = 'US' } = options;

  const genresArray = seed_genres.split(',').join('%2C');

  const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_artists=${seed_artist}&seed_genres=${genresArray}&seed_tracks=${seed_track}`;
  console.log(url);
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
    const fullData = searchItems.map((item) => item);
    console.log(fullData);
    return searchItems;
  } catch (error) {
    throw error;
  }
};

const getArtistDetails = async (spotifyAccessToken, artistId, options = {}) => {
  const { artistUrl } = SPOTIFY_CONFIG;
  const url = `${artistUrl}/${artistId}`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    console.log(response);
    return response; // Assuming the response contains artist details
  } catch (error) {
    throw error;
  }
};

const getArtistsDetails = async (spotifyAccessToken, artistIds, options = {}) => {
  const { artistUrl } = SPOTIFY_CONFIG;
  const idsString = artistIds.join(',');
  const url = `${artistUrl}?ids=${idsString}`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    return response; // Assuming the response contains artist details
  } catch (error) {
    throw error;
  }
};

const getAlbumIds = async (spotifyAccessToken, most_popid, options = {}) => {
  const { artistUrl } = SPOTIFY_CONFIG;
  const { limit = 20, offset = 0 } = options;
  const url = `${artistUrl}/${most_popid}/albums?include_groups=single%2Calbum&limit=${limit}&offset=${offset}`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    const albums = response.items;
    const albumIds = albums.map((album) => album.id);
    return albumIds;
  } catch (error) {
    throw error;
  }
};

// Get album details from albumId
const getAlbumDetails = async (spotifyAccessToken, albumId) => {
  const url = `https://api.spotify.com/v1/albums/${albumId}/tracks`;
  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    return response;
  } catch (error) {
    throw error;
  }
};

// Get tracks from albums
const getAlbumTracks = async (spotifyAccessToken, albumIds) => {
  const albstr = albumIds.join(',');
  const url = `https://api.spotify.com/v1/albums?ids=${albstr}&market=US`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    const albumTracks = response.albums.map((album) => album.tracks.items).flat();
    return albumTracks;
  } catch (error) {
    throw error;
  }
};
// const getNewRelease Album tracks
const getNewAlbumTracks = async (spotifyAccessToken, albumIds) => {
  const albstr = albumIds.join(',');
  const url = `https://api.spotify.com/v1/albums?ids=${albstr}&market=US`;

  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    const albumTracks = response.albums.map((album) => ({
      track: {
        ...album.tracks.items[0], // Spread all details of the first track
        popularity: album.popularity, // Include popularity
      },
    }));
    return albumTracks; // Extracting only the first track from each album
  } catch (error) {
    throw error;
  }
};
// Get track details from trackId
const getTrackDetails = async (spotifyAccessToken, trackId) => {
  const url = `https://api.spotify.com/v1/tracks/${trackId}`;
  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    return response;
  } catch (error) {
    console.error('Error fetching track details:', error);
    throw error;
  }
};

// Function to get the duration of tracks
const getTrackDurations = async (spotifyAccessToken, trackIds) => {
  const batchSize = 50;
  let trackDurations = [];

  for (let i = 0; i < trackIds.length; i += batchSize) {
    const batchIds = trackIds.slice(i, i + batchSize);
    const idsString = batchIds.join(',');
    const url = `https://api.spotify.com/v1/tracks?market=US&ids=${idsString}`;

    try {
      const response = await fetchSpotifyData(spotifyAccessToken, url);
      const batchDurations = response.tracks.map((track) => ({
        id: track.id,
        duration_ms: track.duration_ms,
        popularity: track.popularity,
      }));
      trackDurations = trackDurations.concat(batchDurations);
    } catch (error) {
      console.error('Error fetching track durations:', error);
      // Handle error
    }
  }

  return trackDurations;
};

// Function to get the audio features of tracks
const getAudioFeatures = async (spotifyAccessToken, trackIds) => {
  const batchSize = 50;
  let audioFeatures = [];

  for (let i = 0; i < trackIds.length; i += batchSize) {
    const batchIds = trackIds.slice(i, i + batchSize);
    const idsString = batchIds.join(',');
    const url = `https://api.spotify.com/v1/audio-features?ids=${idsString}`;

    try {
      const response = await fetchSpotifyData(spotifyAccessToken, url);
      audioFeatures = audioFeatures.concat(response.audio_features);
    } catch (error) {
      console.error('Error fetching audio features:', error);
      // Handle error
    }
  }

  return audioFeatures;
};
const getAudioFeature = async (spotifyAccessToken, trackId) => {
  const url = `https://api.spotify.com/v1/audio-features/${trackId}`;
  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    return response; // Assuming the response contains artist details
  } catch (error) {
    throw error;
  }
};

// To get Similar songs
const getSimilarSongs = async (spotifyAccessToken, artistId, seedGenres, trackId) => {
  const limit = 6;
  const market = 'US';
  const genres = seedGenres.slice(0, 3).join('%2C');
  const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_artists=${artistId}&seed_genres=${genres}&seed_tracks=${trackId}`;
  try {
    const response = await fetchSpotifyData(spotifyAccessToken, url);
    console.log(response);
    return response; // Assuming the response contains artist details
  } catch (error) {
    throw error;
  }
};
export {
  SPOTIFY_CONFIG,
  getSpotifyAccessTokenFromRefresh,
  newReleases,
  searchTrack,
  similarSongs,
  getArtistDetails,
  getArtistsDetails,
  getAlbumIds,
  getAlbumTracks,
  getAlbumDetails,
  getTrackDurations,
  getAudioFeatures,
  getAudioFeature,
  getSimilarSongs,
  getTrackDetails,
  getNewAlbumTracks,
};
