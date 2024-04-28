import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';
import { useNavigate } from 'react-router-dom';

const SimilarSongs = (props) => {
  const {similarSongs} = props;
  const [releasesData, setReleasesData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const first5Releases = similarSongs.slice(0, 6);
        console.log(first5Releases);
        ;
        console.log(first5Releases);
        const releasesWithTracks = first5Releases.map((track, index) => ({

            ...track,
            release_date: first5Releases[index].album.release_date.slice(0, 4),
            images: first5Releases[index].album.images,
          
        }));
        console.log(releasesWithTracks);
        setReleasesData(releasesWithTracks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [similarSongs]);

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
      console.log(selectedSong);
      localStorage.setItem('selectedSong', JSON.stringify(selectedSong));
      window.location.reload();
      // Rest of your code...
    } catch (error) {
      console.error('Error handling click:', error);
    }
  }
  return (
   
    <div className="similarsongs-container">
      <h2>Similar Songs</h2>
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

export default SimilarSongs;
