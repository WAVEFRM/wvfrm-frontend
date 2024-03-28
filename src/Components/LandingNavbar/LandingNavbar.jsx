import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { black } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginButton from '../LoginButton/LoginButton';
import wvfmLlogo from "../../Assets/web-logo-no-bg.png";
import './LandingNavbar.css';

const logoStyle = {
  width: '140px',
  height: 'auto',
  margin:10
};

function LandingNavbar() {
 

  return (
 
    <div  className="nav-landingheader">
      
       
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            
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

    <div className="nav-login-btn">                         
            <LoginButton /> 
        </div>
    
    </div>
  
  );
}
export default LandingNavbar;