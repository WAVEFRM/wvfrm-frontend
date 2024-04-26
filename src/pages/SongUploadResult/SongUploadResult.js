import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SlotMachine from '../../components/SlotMachine/SlotMachine';


import './SongUploadResult.css';

const SongUploadResult = () => {
  const [songDetails, setSongDetails] = useState(null);
  const {id}=useParams();
  const audioRef = React.createRef(); 

  useEffect(() => {
    const storedSong = localStorage.getItem('clickedSong');
    if (storedSong) {
      const parsedSong = JSON.parse(storedSong);
      setSongDetails(parsedSong);
    } else {
      // Handle scenario where clickedSong is not found in localStorage
      console.error('Clicked song details not found in localStorage');
    }
  }, []);



  if (!songDetails) {
    return <p>Loading song details...</p>;
  }

  return (
   <div>
    <Navbar />
    <div className="song-result-container">
      <div className="predict-song-result">
     <div className="upload-song-details">
      <img src={songDetails.song_cover_art_url} alt="Song cover" className="song-cover" />
      <h5>{songDetails.song_name}</h5>    
      <div className="song-play">
       <audio ref={audioRef} src={songDetails.song_file_url} controls /> 
      </div>
    </div>
      <div className="song-popularity">
      <SlotMachine value={songDetails.result.predicted_popularity.toUpperCase()} />
      
      </div>
    </div>
      
      <div className="upload-song-attributes">
        <div className="upload-attribute">
          <p className="upload-attribute-label">Duration</p>
          <p className="upload-attribute-value">{songDetails.result.duration.toFixed(2)} seconds</p>
        </div>
        <div className="upload-attribute">
          <p className="upload-attribute-label">Tempo</p>
          <p className="upload-attribute-value">{songDetails.result.tempo.toFixed(2)} BPM</p>
        </div>   
        <div className="upload-attribute">
          <p className="upload-attribute-label">Energy</p>
          <p className="upload-attribute-value">{songDetails.result.energy.toFixed(2)} </p>
        </div>
        <div className="upload-attribute">
          <p className="upload-attribute-label">Danceability</p>
          <p className="upload-attribute-value">{songDetails.result.danceability.toFixed(2)}</p>
        </div>
        <div className="upload-attribute">
          <p className="upload-attribute-label">Instrumentalness</p>
          <p className="upload-attribute-value">{songDetails.result.instrumentalness.toFixed(2)} </p>
        </div>
        <div className="upload-attribute">
          <p className="upload-attribute-label">Speechiness</p>
          <p className="upload-attribute-value">{songDetails.result.speechiness.toFixed(2)} </p>
        </div>      
        <div className="upload-attribute">
         <p className="upload-attribute-label">Loudness</p>
            <p className="upload-attribute-value">{songDetails.result.loudness.toFixed(2)}</p>
      </div>

          <div className="upload-attribute">
      <p className="upload-attribute-label">Chroma STFT</p>
       <p className="upload-attribute-value">{songDetails.result.chroma_stft.toFixed(2)}</p>
      </div>

    <div className="upload-attribute">
      <p className="upload-attribute-label">Valence</p>
      <p className="upload-attribute-value">{songDetails.result.valence.toFixed(2)}</p>
    </div>

      <div className="upload-attribute">
       <p className="upload-attribute-label">Acousticness</p>
      <p className="upload-attribute-value">{songDetails.result.acousticness.toFixed(2)}</p>
      </div>    
      </div>   
    </div>
    <Footer/>
    </div>
   
  );
};

export default SongUploadResult;