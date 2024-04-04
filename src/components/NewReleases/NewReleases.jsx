import React from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';

const NewReleases = (props) => {
   const first5Releases=props.newReleasesData.slice(0,6);
  return (
    <div className="newreleases-container">
      <h2>New Releases</h2>
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

export default NewReleases;
