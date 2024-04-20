import React, { useEffect, useState } from 'react';
import './SearchUpload.css';
import { searchTrack, getSpotifyAccessTokenFromRefresh } from '../../services/spotify/spotify-service';
import { useNavigate } from 'react-router-dom';

const SearchUpload = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showList, setShowList] = useState(false);
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const cachedAccessToken = localStorage.getItem('spotifyAccessToken');
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');

        if (cachedAccessToken && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - timestamp;
          const expirationTime = 1000 * 60 * 2;

          if (elapsedTime < expirationTime) {
            setSpotifyAccessToken(cachedAccessToken);
            setLoading(false);
            return;
          }
        }
        const newAccessToken = await getSpotifyAccessTokenFromRefresh();
        setSpotifyAccessToken(newAccessToken);

        localStorage.setItem('spotifyAccessToken', newAccessToken);
        localStorage.setItem('cachedTimestamp', new Date().getTime().toString());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm !== '') {
      const search = async () => {
        try {
          const newAccessToken = localStorage.getItem('spotifyAccessToken');
          const searchItems = await searchTrack(newAccessToken, debouncedSearchTerm);
          console.log(searchItems)
          
          const trackDetails = searchItems.map((item) => ({
            name: item.name,
            artists_name: item.artists,
            explicit: item.explicit,
            id: item.id,
            duration_ms: item.duration_ms,
            popularity: item.popularity,
            relaseDate: item.album.release_date.slice(0,4),
            coverImage: item.album.images[0].url
          }));
          console.log(trackDetails)
          setSearchResults(trackDetails);
          setShowList(true);
        } catch (error) {
          console.log(error);
        }
      };
      search();
    } else {
      setShowList(false);
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleSongSelection = (song) => {
    setSearchTerm(song);
    localStorage.setItem('selectedSong', JSON.stringify(song));
    navigate('/predict');
    setShowList(false);
  };

  return (
    <div className="SearchContainer">
      <div className="listandinput">
        <input type="text" placeholder="Search for a song..." value={searchTerm} onChange={handleSearch} />
        {showList && (
          <ul className="songs-list">
            {searchResults.map((song, index) => (
              <li onClick={() => handleSongSelection(song)} className="songsList" key={index}>
                {song.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="OR">
        <h2>OR</h2>
      </div>
    </div>
  );
};

export default SearchUpload;
