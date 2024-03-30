import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import GithubIcon from '@mui/icons-material/GitHub';
import { IconButton } from '@mui/material';
import wvfmLlogo from "../../Assets/web-logo-no-bg.png";
import { AlignHorizontalLeft } from '@mui/icons-material';
const logoStyle = {
  width: '140px',
  height: 'auto',
  margin:10
};

function Footer() {
  return ( 
    <div  className="nav-header" >          
        <NavLink to="/" style={{color: 'black', textDecoration: 'none'}} >
        <div className='wvfm-logo-div-all'>
          <img src={wvfmLlogo } style={logoStyle} alt="logo of sitemark"
          />     
          <div className='wvfm-logo-div-text-all'>
            <h3>WAVEFORM</h3>
          </div>
        </div>   
        </NavLink>
        
        
          <ul style={{display:'flex',flexDirection:'row',justifyContent:'space-around',listStyle:'none',}}>
          <li>
             <NavLink to="/predict" style={{margin:'1rem'}}>Predict</NavLink>
           </li>
           <li>
             <NavLink to="/results" style={{margin:'1rem'}}>Results</NavLink>
          </li>
           <li>
            <NavLink to="/about" style={{margin:'1rem'}}>About</NavLink>
          </li>
           <li>
             <NavLink to="/contact" style={{margin:'1rem'}}>Contact</NavLink>
          </li>       
        </ul>   
      
        <NavLink to="/profile" style={{color: 'black', textDecoration: 'none'}}>
          <div class="githubInfo" style={{justifyContent:'left'}}>
          <IconButton
            color="inherit"
            href="https://github.com/albymat32"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GithubIcon />
          </IconButton>
          </div>
          </NavLink>
    </div>
  
  );
}
export default Footer;