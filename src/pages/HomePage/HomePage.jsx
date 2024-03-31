import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSpotifyAccessTokenFromRefresh, searchTrack, newReleases } from '../../services/spotify-service';
import Navbar from '../../components/Navbar/Navbar';
import SearchUpload from '../../components/SearchUpload/SearchUpload';
import Footer from '../../components/Footer/Footer';
import NewReleases from '../../components/NewReleases/NewReleases';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReleasesData, setNewReleasesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if data is cached in local storage
        const cachedAccessToken = localStorage.getItem('spotifyAccessToken');
        const cachedReleases = localStorage.getItem('newReleasesData');
        const cachedSearchResults = localStorage.getItem('searchResults');
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');

        if (cachedAccessToken && cachedReleases && cachedSearchResults && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - timestamp;
          const expirationTime = 1000 * 60 * 2; // 2 mins in milliseconds

          if (elapsedTime < expirationTime) {
            setSpotifyAccessToken(cachedAccessToken);
            setNewReleasesData(JSON.parse(cachedReleases));
            setSearchResults(JSON.parse(cachedSearchResults));
            setLoading(false);
            return;
          }
        }

        const newAccessToken = await getSpotifyAccessTokenFromRefresh();
        setSpotifyAccessToken(newAccessToken);
        const releases = await newReleases(newAccessToken);
        setNewReleasesData(releases.albums.items);
        const trackNames = await searchTrack(newAccessToken, 'water');
        setSearchResults(trackNames);
        console.log('Track names:', trackNames);

        // Cache data in local storage with timestamp
        localStorage.setItem('spotifyAccessToken', newAccessToken);
        localStorage.setItem('newReleasesData', JSON.stringify(releases.albums.items));
        localStorage.setItem('searchResults', JSON.stringify(trackNames));
        localStorage.setItem('cachedTimestamp', new Date().getTime().toString());

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homepage-container">
      <Navbar />
      <SearchUpload />
      {loading && <Loading />}
      {!loading && error && <p>Error: {error.message}</p>}
      {!loading && !error && <NewReleases newReleasesData={newReleasesData} />}
      <Footer />
    </div>
  );
}

export default HomePage;
