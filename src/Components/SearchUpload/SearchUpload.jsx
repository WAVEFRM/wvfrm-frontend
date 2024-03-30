import React, { useEffect, useState } from 'react';
import "./SearchUpload.css";

const SearchUpload = () => {

  const songNames = [
    "Song 1",
    "Song 2",
    "Song 3",
    "Song 4",
    "Song 5",
    "Song 6",
    "Song 7",
    "Song 8",
    "Song 9",
    "Song 10"
  ];
    const [searchTerm, setSearchTerm] = useState("");
    const [showList, setshowList] = useState(false);
     const [songs, setSongs] = useState([]);
    const [chosenSongs, setchosenSongs] = useState("");
    const [fileName, setFileName] = useState(null);
    const [filePath, setFilePath] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [songName, setSongName] = useState('');
    const [uploadedSong, setUploadedSong] = useState(null);

    const handleFileSelect = (e) => {
      handleFileSelection(e.target.files[0]);
    };
    const handleFileSelection = (file) => {
      setFileName(file.name);
      setFilePath(URL.createObjectURL(file));
      setUploadedSong(file.name.replace(/\.[^/.]+$/, ''));
      setShowForm(true);
  
      const jsonData = {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        lastModified: file.lastModified,
      };
  
    };

    const handleSearch = (e) => {
       const searchTerm=(e.target.value).toLowerCase();
       setSearchTerm(searchTerm);
        setshowList(!!searchTerm && filteredSongs.length > 0);
      };
      const filteredSongs = songNames.filter((song) =>
        song.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
    return (

        
    <div className="SearchContainer">
      <div className="listandinput">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {songNames.length > 0 && filteredSongs.length > 0 && showList && (
          <ul className="songs-list">
            {filteredSongs.map((song,index) => (
              <li
                onClick={() => {
                  setSearchTerm(song);
                  setchosenSongs(song);
                  setshowList(false);
                }}
                className="songsList"
                key={index}
              >
                {song}
              </li>
            ))}
          </ul>
        )}
             {/* <a className="developersurvey" onClick={handleClick}>See the developer survey &gt;&gt;</a> */}
      </div>

    <div className="OR"><h2>OR</h2></div>

    <div className="UploadContainer">
    <div className="input-button">
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileSelect}
                id="fileInput"
              />
              <label htmlFor="fileInput">Choose Music File</label>
            </div>
            {uploadedSong && <p>Uploaded Song: {uploadedSong}</p>}
    </div>
   
    </div>
    );
}

export default SearchUpload;
