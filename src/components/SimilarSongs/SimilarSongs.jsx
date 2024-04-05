import React,{useState,useEffect}from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';

const SimilarSongs = (props) => {

  const [similarSongs, setsimilarSongs] = useState([]);
 
  useEffect(() => {
    const similarsongs = localStorage.getItem('newReleasesData');
    if (similarsongs) {   
      const parsedData = JSON.parse(similarsongs);
      setsimilarSongs(parsedData);
    }
  }, []);

   const first5Releases=similarSongs.slice(0,6);

  return (
   
    <div className="similarsongs-container">
      <h2>Similar Songs</h2>
      <Grid container spacing={2}>
        {first5Releases.map((release) => (
          <Grid item xs={6} sm={4} md={2} key={release.id}>
            <ReleaseCard release={release} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SimilarSongs;
