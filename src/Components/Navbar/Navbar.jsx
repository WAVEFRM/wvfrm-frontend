import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, NavLink } from 'react-router-dom';
import user from "../../Assets/user.png";
import web_logo from "../../Assets/webLogo.png";
import{ useNavigate }from 'react-router-dom'
function Navbar() {

    const navigate=useNavigate()
    return ( 
      <nav className="nav-link">
      <div class="navbarContainer">
        <ul class="nav-list">
        <h1 class="NavHeader"> <li>
            <NavLink to="/" >WAVEFORM</NavLink>
          </li></h1>
          <li>
            <NavLink to="/predict" class="nav-link">Predict</NavLink>
          </li>
          <li>
            <NavLink to="/about" class="nav-link">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" class="nav-link">Contact</NavLink>
          </li>
    
          <div class="userInfo">
            <h3 class="usernameHeader">Username</h3>
            <img class="userLogo" src={user} alt="" />
          </div>
        </ul>
      </div>
    </nav>
    );
    
    }    

export default Navbar;