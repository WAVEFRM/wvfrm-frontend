import React from 'react';
import './Playback.css';
import { Link } from 'react-router-dom';
const Playback = () => {
    return (
      <div className="playback">
        <div className="playbackCard">

        </div>
        <div>
        <Link to='/stat'>
       <button className="playbackPredictbtn">
        Predict
       </button>
       </Link>
       </div>
      </div>
    );
}

export default Playback;
