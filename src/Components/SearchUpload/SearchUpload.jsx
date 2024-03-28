import React, { useEffect, useState } from 'react';
import "./SearchUpload.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LinearProgress from '@mui/material/LinearProgress';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';



const SearchUpload = () => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showList, setshowList] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [chosenSkill, setchosenSkill] = useState("");
    
    const [uploadProgress, setUploadProgress] = useState("");

    const navigate=useNavigate();
    const handleClick = () => {
        navigate('/devsurvey');
      };
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setshowList(true);
      };
      const filteredSkills = jobs.filter((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        axios.post('/upload', formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(percentCompleted);
            }
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
            // handle error here
          });
      };
      

    return (

        
    <div className="SearchContainer">
      <div className="listandinput">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {jobs.length > 0 && filteredSkills.length > 0 && showList && (
          <ul className="songs-list">
            {filteredSkills.map((skill) => (
              <li
                onClick={() => {
                  setSearchTerm(skill);
                  setchosenSkill(skill);
                  setshowList(false);
                }}
                className="songsList"
                key={skill}
              >
                {skill}
              </li>
            ))}
          </ul>
        )}
             {/* <a className="developersurvey" onClick={handleClick}>See the developer survey &gt;&gt;</a> */}
      </div>

    <div className="OR"><h2>OR</h2></div>
    <div className="UploadContainer">
    <input
        accept="audio/mp3,audio/*;capture=microphone"
        className="UploadContainer-input"
        id="contained-button-file"
        type="file"
      />
      <label htmlFor="contained-button-file">   
        <Button 
         onClick={() => {
            alert('clicked');
            }}
        variant="contained" 
        color="primary" 
        component="span"> 
          Upload Song
        </Button>
      </label>
    </div>
    {/* <LinearProgress variant="determinate" value={uploadProgress} /> */}
    </div>
    );
}

export default SearchUpload;
