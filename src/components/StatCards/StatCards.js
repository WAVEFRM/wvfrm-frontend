import React,{useState,useEffect} from 'react';
import './StatCards.css'

const StatCards = () => {
    const [expandedCard, setExpandedCard] = useState(null);

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
       
        return seconds === 60
          ? `${minutes + 1}:00`
          : `${minutes}:${padTo2Digits(seconds)}`;
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
            
             <img src="https://i.ytimg.com/vi/7-x3uD5z1bQ/maxresdefault.jpg" alt="Song Artwork" className='song-detail-stat-artwork'  />
            
            <h1 class="song-detail-stat-title">Watermelon Sugar</h1>
            <h2 class="song-detail-stat-artist">Harry Styles</h2>
            <h2 className="pred-result">The song is predicted as <span>HIT</span></h2>
        </div>
        <div className="song-detail-stat-info">
           
                <div
                    className={`song-detail-stat-info-item ${expandedCard === 'duration' ? 'expanded' : ''}`}
                    onClick={() => handleCardClick('duration')}
                >
                    <span className="song-detail-stat-label">Duration</span>
                    <span className="song-detail-stat-value">{convertMsToMinutesSeconds('400000')}</span>
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
                    <span className="value">5:59</span>
                </div>
                <div
                    className={`song-detail-stat-info-item ${expandedCard === 'loudness' ? 'expanded' : ''}`}
                    onClick={() => handleCardClick('loudness')}
                >
                    <span className="song-detail-stat-label">Loudness</span>
                    <span className="song-detail-stat-value">-4.209</span>
                </div>
                <div
                    className={`song-detail-stat-info-item ${expandedCard === 'key' ? 'expanded' : ''}`}
                    onClick={() => handleCardClick('key')}
                >
                    <span className="song-detail-stat-label">Key</span>
                    <span className="song-detail-stat-value">C Major</span>
                </div>
               
            </div>
    </div>
    );
}

export default StatCards;
