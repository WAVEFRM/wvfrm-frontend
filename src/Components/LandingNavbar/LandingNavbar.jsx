import * as React from 'react';
import Typography from '@mui/material/Typography';
import LoginButton from '../LoginButton/LoginButton';
import wvfmLlogo from "../../Assets/web-logo-no-bg.png";
import { NavLink } from 'react-router-dom';
import './LandingNavbar.css';

const logoStyle = {
  width: '140px',
  height: 'auto',
  margin:10
};

function LandingNavbar() {
 

  return (
 
    <div  className="nav-landingheader">  
     <NavLink to="/"style={{color: 'black', textDecoration: 'none'}} >     
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
         </NavLink>    
          

       <div className="nav-login-btn">                         
            <LoginButton /> 
        </div>
    
    </div>
  
  );
}
export default LandingNavbar;