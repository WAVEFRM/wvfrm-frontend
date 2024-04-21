import React, { useState } from 'react';
import './ResultCards.css'; // Import CSS file for styling

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import inProgressImage from '../../assets/orange-disc.jpg';
import completedImage from '../../assets/white-disc.jpg';
import failedImage from '../../assets/red-disc.jpg';



const ResultCard = ({ name, artist, url,image_url, }) => {
    return (
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>   
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image_url}
          alt="Song cover"
        />
      </Card>
    );
  };



const ResultCards = () => {
    
    const [activeSection, setActiveSection] = useState('inProgress');

    const inProgressSongs = [
        { id: 1, name: "Lost in the Stars", artist: "Julia Smith", url: "example_url", timestamp: "2024-04-07T12:00:00Z",},
        { id: 2, name: "Echoes of the Past", artist: "Michael Johnson", url: "https://example.com/song2.mp3", timestamp: "2024-04-07T13:00:00Z",  },
        { id: 3, name: "City Lights", artist: "Emily Thompson", url: "https://example.com/song3.mp3", timestamp: "2024-04-07T14:00:00Z",  },
        { id: 4, name: "Sunset Serenade", artist: "David Brown", url: "https://example.com/song4.mp3", timestamp: "2024-04-07T15:00:00Z",  },
        { id: 5, name: "Midnight Melodies", artist: "Sophia Garcia", url: "https://example.com/song5.mp3", timestamp: "2024-04-07T16:00:00Z",  },
        { id: 6, name: "Whispers in the Wind", artist: "Alexander Lee", url: "https://example.com/song6.mp3", timestamp: "2024-04-07T17:00:00Z",  }
    ];
    
    const completedSongs = [
        { id: 7, name: "Dreams of Tomorrow", artist: "Olivia White", url: "https://res.cloudinary.com/dxsykdoay/video/upload/v1712064168/song_files/xkhbv6uutgqwj5bkx8gk.mp3", timestamp: "2024-04-06T12:00:00Z",  },
        { id: 8, name: "Everlasting Embrace", artist: "Daniel Rodriguez", url: "https://res.cloudinary.com/dxsykdoay/video/upload/v1712064168/song_files/xkhbv6uutgqwj5bkx8gk.mp3", timestamp: "2024-04-06T13:00:00Z",  }
    ];
    
    const failedSongs = [
        { id: 9, name: "Fading Memories", artist: "Mia Robinson", url: "https://example.com/song9.mp3", timestamp: "2024-04-05T12:00:00Z",  },
        { id: 10, name: "Broken Dreams", artist: "Nathan Evans", url: "https://example.com/song10.mp3", timestamp: "2024-04-05T13:00:00Z",  }
    ];
    

    const handleSectionClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="results-container">
            <div className="result-card-section-navigation">
                <button
                    className={`result-card-section-button ${activeSection === 'inProgress' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('inProgress')}
                >
                    In Progress
                </button>
                <button
                    className={`result-card-section-button ${activeSection === 'completed' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('completed')}
                >
                    Completed
                </button>
                <button
                    className={`result-card-section-button ${activeSection === 'failed' ? 'active' : ''}`}
                    onClick={() => handleSectionClick('failed')}
                >
                    Failed
                </button>
            </div>

            <hr className="result-card-divider" />

            <h2 className="result-card-heading">{
                    activeSection === 'inProgress' ? 'In Progress' :
                    activeSection === 'completed' ? 'Completed' :
                    activeSection === 'failed' ? 'Failed' : ''
            }</h2>
            <div className="result-card-section">
                
               

        <div className="result-card-section">
        {activeSection === 'inProgress' &&
          inProgressSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={inProgressImage} />
          ))}
        {activeSection === 'completed' &&
          completedSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={completedImage} />
          ))}
        {activeSection === 'failed' &&
          failedSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={failedImage} />
          ))}
      </div>
            </div>
        </div>
    );
};

export default ResultCards;
