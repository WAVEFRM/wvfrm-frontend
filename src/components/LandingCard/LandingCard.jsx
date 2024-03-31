import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';

function LandingCard(props) {
  const { post } = props;

  return (
    <Box
    id="image"
    sx={(theme) => ({
      mt: { xs: 8, sm: 10 },
      alignSelf: 'center',
      height: { xs: 200, sm: 800 },
      width: '80%',
      height:'10%',
      backgroundImage:
        theme.palette.mode === 'light'
          ? 'url("/static/images/templates/templates-images/hero-light.png")'
          : 'url("/static/images/templates/templates-images/hero-dark.png")',
      backgroundSize: 'cover',
      borderRadius: '10px',
      outline: '1px solid',
      outlineColor:
        theme.palette.mode === 'light'
          ? alpha('#BFCCD9', 0.5)
          : alpha('#9CCCFC', 0.1),
      boxShadow:
        theme.palette.mode === 'light'
          ? `0 0 12px 8px ${alpha('#9CCCFC', 0.2)}`
          : `0 0 24px 12px ${alpha('#033363', 0.2)}`,
    })}
  >
    <Grid item xs={12} md={15}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' , align:'center',width:'100%'}}>
          <CardContent sx={{ flex: 1 ,width: 450,}}>
            <Typography component="h2" variant="h2">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>      
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 300,height:420, display: { xs: 'none', sm: 'block' },}}
            image={post.image}
          />
        </Card>
      </CardActionArea>
    </Grid>
    </Box>
  );
}

LandingCard.propTypes = {
post: PropTypes.shape({  
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default LandingCard;