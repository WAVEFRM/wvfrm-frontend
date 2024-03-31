import React from 'react';
import wvfrmFavicon from '../../assets/wvfrm-transparent.png';
import LoginButton from '../LoginButton/LoginButton';

function LandingNavbar() {
  return (
    <nav className="bg-dark navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={wvfrmFavicon} alt="Waveform Favicon" width="50" height="50" style={{ marginRight: '10px' }} />
          Waveform
        </a>
        <LoginButton />
      </div>
    </nav>
  );
}

export default LandingNavbar;
