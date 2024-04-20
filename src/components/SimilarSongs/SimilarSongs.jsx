import React from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';

const SimilarSongs = (props) => {

  const {similarSongs} = props;
  const first5Releases=similarSongs;
  console.log(first5Releases);
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
