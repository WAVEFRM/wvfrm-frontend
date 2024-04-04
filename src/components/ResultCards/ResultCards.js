import React, { useState } from 'react';
import './ResultCards.css'; // Import CSS file for styling

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


const ResultCard = ({ name, artist, url,image_url, }) => {
    return (
      <Card sx={{ display: 'flex', marginBottom: '20px' }}>
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
            {/* <IconButton aria-label="play/pause">
              <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            </IconButton> */}
           
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
        { id: 1, name: "Lost in the Stars", artist: "Julia Smith", url: "https://res.cloudinary.com/dxsykdoay/video/upload/v1712064168/song_files/xkhbv6uutgqwj5bkx8gk.mp3", timestamp: "2024-04-07T12:00:00Z",image_url: "https://cdns-images.dzcdn.net/images/cover/995b33eaad9a62409c822ce9c670e542/264x264.jpg"},
        { id: 2, name: "Echoes of the Past", artist: "Michael Johnson", url: "https://example.com/song2.mp3", timestamp: "2024-04-07T13:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmQnBM9AVodzRxcSMiym4BMU-rJUePf3DJFw&s" },
        { id: 3, name: "City Lights", artist: "Emily Thompson", url: "https://example.com/song3.mp3", timestamp: "2024-04-07T14:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROG4CP7J9Qh9lhBDOfbVT6NLdyTVnRiD0NPA&s" },
        { id: 4, name: "Sunset Serenade", artist: "David Brown", url: "https://example.com/song4.mp3", timestamp: "2024-04-07T15:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMa9OXdhqKii2BdExJRyfkYScfFxpKAsE4xg&s" },
        { id: 5, name: "Midnight Melodies", artist: "Sophia Garcia", url: "https://example.com/song5.mp3", timestamp: "2024-04-07T16:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbWFib-BIATJoLHN06PXJYtp6IjKkFyXqxg&s" },
        { id: 6, name: "Whispers in the Wind", artist: "Alexander Lee", url: "https://example.com/song6.mp3", timestamp: "2024-04-07T17:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxuDGS8vUSD45uy7_ztldO-yMWEErwOyknQ&s" }
    ];
    
    const completedSongs = [
        { id: 7, name: "Dreams of Tomorrow", artist: "Olivia White", url: "https://example.com/song7.mp3", timestamp: "2024-04-06T12:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqyPTkUjiHuOyJsreFOz9Cceh0iFmsxFOvIg&s" },
        { id: 8, name: "Everlasting Embrace", artist: "Daniel Rodriguez", url: "https://example.com/song8.mp3", timestamp: "2024-04-06T13:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMCApjjBMhhf-bTcIYlR0WE2JNbgU6BrTuQ&s" }
    ];
    
    const failedSongs = [
        { id: 9, name: "Fading Memories", artist: "Mia Robinson", url: "https://example.com/song9.mp3", timestamp: "2024-04-05T12:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPn1qcezkkxSR2fW1wdo22RpgCgDJsw_kG1Q&s" },
        { id: 10, name: "Broken Dreams", artist: "Nathan Evans", url: "https://example.com/song10.mp3", timestamp: "2024-04-05T13:00:00Z", image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbAfa9woGCeDz2qny87zXrEOfjHEaHrv1bmg&s" }
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
                
                {/* {activeSection === 'inProgress' && inProgressSongs.map(song => (
                    <div className="result-card-in-progress" key={song.id}>
                        <h3>{song.name}</h3>
                        <p>{song.artist}</p>
                        <audio controls>
                            <source src={song.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
                {activeSection === 'completed' && completedSongs.map(song => (
                    <div className="result-card-completed" key={song.id}>
                        <h3>{song.name}</h3>
                        <p>{song.artist}</p>
                        <audio controls>
                            <source src={song.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
                {activeSection === 'failed' && failedSongs.map(song => (
                    <div className="result-card-failed" key={song.id}>
                        <h3>{song.name}</h3>
                        <p>{song.artist}</p>
                        <audio controls>
                            <source src={song.url} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))} */}

        <div className="result-card-section">
        {activeSection === 'inProgress' &&
          inProgressSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={song.image_url} />
          ))}
        {activeSection === 'completed' &&
          completedSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={song.image_url} />
          ))}
        {activeSection === 'failed' &&
          failedSongs.map((song) => (
            <ResultCard key={song.id} name={song.name} artist={song.artist} url={song.url} image_url={song.image_url} />
          ))}
      </div>
            </div>
        </div>
    );
};

export default ResultCards;
