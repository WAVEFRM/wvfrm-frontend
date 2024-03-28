import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import wvfmLlogo from "../../Assets/web-logo-no-bg.png";
import Typography from '@mui/material/Typography';

import GithubIcon from '@mui/icons-material/GitHub';

const logoStyle = {
  width: '140px',
  height: 'auto',
};



export default function Footer() {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
     
      alignItems: 'center',
      gap: { xs: 4, sm: 8 },
      py: { xs: 8, sm: 3 },
      textAlign: { sm: 'center', md: 'left' },
      borderTop: "1px solid #000",
      marginTop: "auto",
    }}
  > 
   
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          justifyContent: 'space-between',
        }}               
  component="footer"
      >
       
          <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            
          >
          <div className='wvfm-logo-div'>
          
          <img
            src={wvfmLlogo }                       
            style={logoStyle}
            alt="logo of sitemark"
          />
       
       <div className='wvfm-logo-div-text'>
           <h3>WAVEFORM</h3>
         </div>
         </div>   
          </Typography>
            
          </Box>


        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 7,
          }}
        >
          <Link color="#3a30f0" href="/predict" underline="hover">
          Predict
          </Link>
          <Link color="#3a30f0" href="/upload" underline="hover">
           Upload
          </Link>
          <Link color="#3a30f0" href="/about" underline="hover">
           About
          </Link>
          <Link color="#3a30f0" href="/profile" underline="hover">
            Profile
          </Link>  

          <IconButton
            color="inherit"
            href="https://github.com/albymat32"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GithubIcon />
          </IconButton>

        </Box>      
      </Box>     
   
    </Box>
  );
}