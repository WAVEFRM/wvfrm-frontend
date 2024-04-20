import React, { useState,} from 'react';
import './StatCards.css';

const StatCards = (props) => {
    
  const { data, songData } = props; // data -acou,danc,inst and songData - name ,duration etc..
  const [expandedCard, setExpandedCard] = useState(null);

  // Parse the JSON string back into an object

  const artistNames = songData?.artists_name.map((artist) => artist.name).join(', ');

  // Key Encoding
  const dict = {
    0: 'C',
    1: 'C#',
    2: 'D',
    3: 'D#',
    4: 'E',
    5: 'F',
    6: 'F#',
    7: 'G',
    8: 'G#',
    9: 'A',
    10: 'A#',
    11: 'B',
  };

  let minmajor = data.mode === 0 ? ' Minor' : ' Major';
  let keyString = 'C'; // Default key is C
  for (let i = 1; i <= 11; i++) {
    if (data[`key_${i}`] === 1) {
      keyString = dict[i];
      break;
    }
  }
  const keyModeString = `${keyString}${minmajor}`;
  // Key Encoding ends here
  const handleCardClick = (cardId) => {
    if (expandedCard === cardId) {
      setExpandedCard(null); // Collapse the card if it's already expanded
    } else {
      setExpandedCard(cardId); // Expand the clicked card
    }
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function convertMsToMinutesSeconds(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);

    return seconds === 60 ? `${minutes + 1}:00` : `${minutes}:${padTo2Digits(seconds)}`;
  }

  const convertMsToMinutes = (milliseconds) => {
    const minutes = Math.floor(milliseconds / 60000);
    return minutes;
  };

  const durationMilliseconds = 400000;
  const durationMinutes = convertMsToMinutes(durationMilliseconds);
  const sliderWidthPercentage = (durationMinutes / 10) * 100;

  return (
    <div class="song-detail-stat-container">
      <div class="song-detail-stat-header">
        <img src={songData.coverImage} alt="Song Artwork" className="song-detail-stat-artwork" />

        <h1 class="song-detail-stat-title">{songData.name}</h1>
        <h2 class="song-detail-stat-artist">{artistNames}</h2>
        <h2 className="pred-result">
          The song is predicted as <span>{data.prediction}</span>
        </h2>
      </div>
      <div className="song-detail-stat-info">
        <div
          className={`song-detail-stat-info-item ${expandedCard === 'duration' ? 'expanded' : ''}`}
          onClick={() => handleCardClick('duration')}
        >
          <span className="song-detail-stat-label">Duration</span>
          <span className="song-detail-stat-value">{convertMsToMinutesSeconds(data.duration_ms)}</span>
          {expandedCard === 'duration' && (
            <div className="slider-container">
              <div className="slider-bar" style={{ width: `${sliderWidthPercentage}%` }} />
            </div>
          )}
        </div>
        <div
          className={`song-detail-stat-info-item ${expandedCard === 'tempo' ? 'expanded' : ''}`}
          onClick={() => handleCardClick('tempo')}
        >
          <span className="song-detail-stat-label">Tempo</span>
          <span className="value">{data.tempo}</span>
        </div>
        <div
          className={`song-detail-stat-info-item ${expandedCard === 'loudness' ? 'expanded' : ''}`}
          onClick={() => handleCardClick('loudness')}
        >
          <span className="song-detail-stat-label">Loudness</span>
          <span className="song-detail-stat-value">{data.loudness}</span>
        </div>
        <div
          className={`song-detail-stat-info-item ${expandedCard === 'key' ? 'expanded' : ''}`}
          onClick={() => handleCardClick('key')}
        >
          <span className="song-detail-stat-label">Key</span>
          <span className="song-detail-stat-value">{keyModeString}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
