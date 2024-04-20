import React, { useEffect, useState } from 'react';
import './Playback.css';
import { Link } from 'react-router-dom';
import { highLevelPrediction } from '../../services/api/prediction-results';

const Playback =(props) => {
  
  const {trackUrl,finalObject} = props;
  
  
  return (
    <div className="playback">
      <iframe
        title="Embedded Spotify Track"
        style={{ borderRadius: '12px' }}
        src={trackUrl}
        width="50%"
        height="152"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      
    </div>
  );
};

export default Playback;
