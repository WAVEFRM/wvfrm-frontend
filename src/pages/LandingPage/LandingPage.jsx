import React, { useEffect, useState } from 'react';
import LandingNavbar from '../../components/LandingNavbar/LandingNavbar';
import Hero from '../../components/Hero';
import Footer from '../../components/Footer/Footer';

function LandingPage() {
  return (
    <div>
      <LandingNavbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default LandingPage;
