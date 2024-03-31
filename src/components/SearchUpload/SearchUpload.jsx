import React, { useState } from 'react';
import './SearchUpload.css';
import UploadButton from '../UploadButton/UploadButton';

const SearchUpload = () => {
  const songNames = [
    'Song 1',
    'Song 2',
    'Song 3',
    'Song 4',
    'Song 5',
    'Song 6',
    'Song 7',
    'Song 8',
    'Song 9',
    'Song 10',
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [uploadedSong, setUploadedSong] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedSong(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setShowList(!!searchTerm && filteredSongs.length > 0);
  };

  const filteredSongs = songNames.filter((song) => song.toLowerCase().includes(searchTerm));

  const handleSongSelection = (song) => {
    setSearchTerm(song);
    setUploadedSong(null); // Clear uploaded song if any
    setShowList(false);
  };

  return (
    <div className="SearchContainer">
      <div className="listandinput">
        <input type="text" placeholder="Search for a song..." value={searchTerm} onChange={handleSearch} />
        {showList && (
          <ul className="songs-list">
            {filteredSongs.map((song, index) => (
              <li onClick={() => handleSongSelection(song)} className="songsList" key={index}>
                {song}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="OR">
        <h2>OR</h2>
      </div>

      <div className="UploadContainer">
        <div className="input-button">
          <input type="file" accept="audio/*" onChange={handleFileSelect} id="fileInput" />
          <label htmlFor="fileInput">Choose Music File</label>
        </div>
        {uploadedSong && <p>Uploaded Song: {uploadedSong}</p>}
      </div>
      <UploadButton />
    </div>
  );
};

export default SearchUpload;
