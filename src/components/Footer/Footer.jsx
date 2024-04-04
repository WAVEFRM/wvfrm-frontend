import React from 'react';
import { NavLink } from 'react-router-dom';
import wvfmFavicon from '../../assets/wvfrm-transparent.png';
import GithubIcon from '@mui/icons-material/GitHub';


function Footer() {
  return (
    <div className="footer-container">
      <footer
        className="bg-dark d-flex flex-wrap justify-content-between align-items-center py-3 border-top footerdiv"
        data-bs-theme="dark"
      >
        <div className="col-md-4 d-flex align-items-center">
          <NavLink to="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
            <img src={wvfmFavicon} alt="Waveform Favicon" width="50" height="50" />
          </NavLink>
          <span className="mb-3 mb-md-0 me-3 text-body-secondary">&copy; 2024 Waveform</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary me-3" href="https://github.com/WAVEFRM/">
              <GithubIcon />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
