import React, { useEffect, useState } from 'react'
import Landing from '../Components/Landing/Landing'
import Navbar from '../Components/Navbar/Navbar';
import LandingNavbar from '../Components/LandingNavbar/LandingNavbar';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer/Footer';
function LandingPage(){

   return(
      <div>
       <LandingNavbar />
       <Hero />
       <Footer />
      </div> 
   )
};


export default LandingPage;