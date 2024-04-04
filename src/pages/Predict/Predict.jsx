import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Playback from '../../components/Playback/Playback';
import SimilarSongs from '../../components/SimilarSongs/SimilarSongs';
import Footer from '../../components/Footer/Footer';

function Predict() {
  return (
    <div>
      <Navbar />
      <Playback />
      {/* <SimilarSongs /> */}
      <Footer />
    </div>
  );
}

export default Predict;
