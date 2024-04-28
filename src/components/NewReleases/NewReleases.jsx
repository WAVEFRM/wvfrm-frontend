import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';
import {
  getAlbumDetails,
  getSpotifyAccessTokenFromRefresh,
  getTrackDetails,
  getNewAlbumTracks, // Import the new function
} from '../../services/spotify/spotify-service';
import { useNavigate } from 'react-router-dom';

const NewReleases = (props) => {
  const [releasesData, setReleasesData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const first5Releases = props.newReleasesData.slice(0, 6);
        console.log(first5Releases);
        const ids = first5Releases.map((album) => album.id);
        const accessToken = await getSpotifyAccessTokenFromRefresh();

        // Use the new function to get tracks
        const tracksFromAlbumIDS = await getNewAlbumTracks(accessToken, ids);
        console.log(first5Releases);
        console.log(tracksFromAlbumIDS);
        const releasesWithTracks = tracksFromAlbumIDS.map((track, index) => ({

            ...track.track,
            release_date: first5Releases[index].release_date.slice(0, 4),
            images: first5Releases[index].images,
          
        }));
        console.log(releasesWithTracks);
        setReleasesData(releasesWithTracks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [props.newReleasesData]);

  async function handleClick(release) {
    try {
      console.log(release);
      const selectedSong = {
        name: release.name,
        artists_name: release.artists,
        explicit: release.explicit,
        id: release.id,
        duration_ms: release.duration_ms,
        popularity: release.popularity,
        relaseDate: release.release_date,
        coverImage: release.images[0].url,
      };
      setReleasesData(selectedSong);
      console.log(selectedSong);
      localStorage.setItem('selectedSong', JSON.stringify(selectedSong));
      navigate('/predict');
      // Rest of your code...
    } catch (error) {
      console.error('Error handling click:', error);
    }
  }

  return (
    <div className="newreleases-container">
      <h2>New Releases</h2>
      <Grid container spacing={2}>
        {releasesData.map((release) => (
          <Grid item xs={6} sm={4} md={2} key={release.id}>
            <ReleaseCard release={release} onClick={handleClick} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewReleases;
