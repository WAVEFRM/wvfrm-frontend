import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Playback from '../Components/Playback/Playback';
import SimilarSongs from '../Components/SimilarSongs/SimilarSongs';
import Footer from '../Components/Footer/Footer';



const SpotifyDetails = () => {
    return (
        <div>
            <Navbar />
            <Playback/>
            <SimilarSongs/>
            <Footer />
        </div>
    );
};

export default SpotifyDetails;
