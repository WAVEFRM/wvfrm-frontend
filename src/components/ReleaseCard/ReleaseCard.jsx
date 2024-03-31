import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function ReleaseCard({ release }) {
  const maxLength = 40;
  let displayText = release.name + ', ' + release.artists.map((artist) => artist.name).join(', ');

  if (displayText.length > maxLength) {
    displayText = release.name;
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea component="a" href={release.external_urls.spotify} sx={{ flexGrow: 1 }}>
        <CardMedia component="img" image={release.images[0].url} alt={release.name} sx={{ height: 200 }} />
        <Typography variant="body1" color="text.secondary" align="center" sx={{ p: 2 }}>
          {displayText}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default ReleaseCard;
