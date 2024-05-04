import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

import axios from 'axios';
import './ResultCards.css'; // Import CSS file for styling
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import music_note from '../../assets/music_note.png';

const ResultCard = ({ name, artist, url, image_url,clickable,handleClick }) => {
  return (
    <Card disabled={!clickable} sx={{ display: 'flex', 
    transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: clickable ? 'pointer' : 'default',
        '&:hover': {
          transform: clickable ? 'translateY(-5px)' : 'none',
          boxShadow: clickable ? '0px 2px 4px rgba(0, 0, 0, 15)' : 'none',
        }, 
    }}
    onClick={clickable ? handleClick : null}
    >
       
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {artist}
          </Typography>
        </CardContent>
        {clickable && (
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <audio controls>
            <source src={url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
         )}
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 150 }}
        image={image_url}
        alt="Song cover"
      />
     
    </Card>
   
  );
};

const ResultCards = () => {
  const [activeSection, setActiveSection] = useState('completed');
  let navigate = useNavigate();
 
  const BASE_URL = process.env.REACT_APP_DRF_BASE_URL;
  const [songs, setSongs] = useState({
    inProgress: [],
    completed: [],
    failed: [],
  });

  useEffect(() => {
    
    const storedAccessToken = localStorage.getItem('accessToken') || '';
   
    const fetchData = async (token) => {
      try {
        const response = await axios.get(`${BASE_URL}/predict/popularity_prediction_tasks/`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        const data = await response.data;
        console.log(data);
       
        
        const completed = data.filter(song => song.status === 'completed');
        localStorage.setItem('completedSongs', JSON.stringify(completed));
        console.log(completed)
        setSongs({
          inProgress: data.filter(song => song.status === 'pending'),
          completed: data.filter(song => song.status === 'completed'),
          failed: data.filter(song => song.status === 'failed'),
        });
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchData(storedAccessToken);
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleCardClick = (id,click) => {
    if(click){   
    const clickedSong =  JSON.parse(localStorage.getItem('completedSongs'))?.find(song => song.id === id);
    localStorage.setItem('clickedSong', JSON.stringify(clickedSong));  
     navigate(`/song-upload-result/${id}`);
   
    
    // return redirect(`/song-upload-result/${id}`);
    };
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

      <h2 className="result-card-heading">
        {activeSection === 'inProgress' ? 'In Progress' :
          activeSection === 'completed' ? 'Completed' :
            activeSection === 'failed' ? 'Failed' : ''}
      </h2>

      <div className="result-card-section">
        {activeSection === 'inProgress' &&
           (songs.inProgress.length === 0 ? (
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', lineHeight: 8,marginLeft:'40%',}}>
              No songs to display.
            </Typography>
          ) : (
          songs.inProgress.map((song) => (
            <ResultCard
              key={song.id}
              name={song.song_name}
              artist={song.artist}
              url={song.song_file_url}
              image_url={song.song_cover_art_url}
              clickable={false}
              handleClick={() => handleCardClick(song.id,false)}
            />
          ))
          ))}
        {activeSection === 'completed' &&
           (songs.completed.length === 0 ? (
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', lineHeight: 8,marginLeft:'40%', }}>
              No songs to display.
            </Typography>
          ) : (
          songs.completed.map((song) => (
            <ResultCard
              key={song.id}
              name={song.song_name}
              artist={song.artist}
              url={song.song_file_url}
              image_url={song.song_cover_art_url}
              clickable={true}
              handleClick={() => handleCardClick(song.id,true)}
            />
          ))
          ))}
        {activeSection === 'failed' &&
         (songs.failed.length === 0 ? (
          <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', lineHeight: 8,marginLeft:'40%', }}>
            No songs to display.
          </Typography>
        ) : (
          songs.failed.map((song) => (
            <ResultCard
              key={song.id}
              name={song.song_name}
              artist={song.artist}
              url={song.song_file_url}
              image_url={song.song_cover_art_url}
              clickable={false}
              handleClick={() => handleCardClick(song.id,false)}
            />
          ))
          ))}
      </div>
    </div>
  );
};

export default ResultCards;
