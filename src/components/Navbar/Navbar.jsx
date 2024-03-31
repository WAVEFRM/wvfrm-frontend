import React from 'react';
import { NavLink } from 'react-router-dom';
import wvfrmFavicon from '../../assets/wvfrm-transparent.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  return (
    <nav className="bg-dark navbar navbar-expand-lg" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src={wvfrmFavicon} alt="Waveform Favicon" width="50" height="50" style={{ marginRight: '10px' }} />
          Waveform
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/predict" className="nav-link" activeClassName="active">
                Predict
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/results" className="nav-link" activeClassName="active">
                Results
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link" activeClassName="active">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link" activeClassName="active">
                Contact
              </NavLink>
            </li>
          </ul>

          <NavLink to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
            <div className="userInfo">
              <div>
                <AccountCircleIcon fontSize="large" />
              </div>
              {/* <h6 className="usernameHeader">Username</h6> */}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
