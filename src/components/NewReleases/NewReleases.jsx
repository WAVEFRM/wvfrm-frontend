import React from 'react';
import Grid from '@mui/material/Grid';
import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';

const NewReleases = (props) => {
  return (
    <div className="newreleases-container">
      <h2>New Releases</h2>
      <Grid container spacing={2}>
        {props.newReleasesData.map((release) => (
          <Grid item xs={6} sm={4} md={2} key={release.id}>
            <ReleaseCard release={release} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NewReleases;
