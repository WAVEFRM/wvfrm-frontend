import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

import wvfmLlogo from '../../assets/web-logo-no-bg.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.css';

const logoStyle = {
  width: '140px',
  height: 'auto',
  margin: 10,
};

function Navbar() {
  return (
    <div className="nav-header">
      <NavLink to="/" style={{ color: 'black', textDecoration: 'none' }}>
        <div className="wvfm-logo-div-all">
          <img src={wvfmLlogo} style={logoStyle} alt="logo of sitemark" />
          <div className="wvfm-logo-div-text-all">
            <h3>WAVEFORM</h3>
          </div>
        </div>
      </NavLink>

      <ul class="nav-list">
        <li>
          <NavLink to="/predict" class="nav-link">
            Predict
          </NavLink>
        </li>
        <li>
          <NavLink to="/results" class="nav-link">
            Results
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" class="nav-link">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" class="nav-link">
            Contact
          </NavLink>
        </li>
      </ul>

      <NavLink to="/profile" style={{ color: 'black', textDecoration: 'none' }}>
        <div class="userInfo">
          <h3 class="usernameHeader">Username</h3>
          <div>
            <AccountCircleIcon fontSize="large" />
          </div>
        </div>
      </NavLink>
    </div>
  );
}
export default Navbar;
