import React from 'react';
import Navbar from '../../components/Navbar/Navbar';

import Footer from '../../components/Footer/Footer';
import ResultCards from '../../components/ResultCards/ResultCards';
export default function Results() {
  return (
    <div className="results-container">
        <Navbar />
        <h1>Results</h1>
       <ResultCards />
       <Footer />
     
    </div>
  );
}
