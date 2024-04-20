import React, { useEffect, useState } from 'react';
import { getSpotifyAccessTokenFromRefresh, newReleases } from '../../services/spotify/spotify-service';
import Navbar from '../../components/Navbar/Navbar';
import SearchUpload from '../../components/SearchUpload/SearchUpload';
import UploadArea from '../../components/UploadArea/UploadArea';
import Footer from '../../components/Footer/Footer';
import NewReleases from '../../components/NewReleases/NewReleases';
import Loading from '../../components/Loading/Loading';

function HomePage() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newReleasesData, setNewReleasesData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Check if data is cached in local storage
        const cachedAccessToken = localStorage.getItem('spotifyAccessToken');
        const cachedReleases = localStorage.getItem('newReleasesData');
        const cachedTimestamp = localStorage.getItem('cachedTimestamp');

        if (cachedAccessToken && cachedReleases && cachedTimestamp) {
          const timestamp = parseInt(cachedTimestamp);
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - timestamp;
          const expirationTime = 1000 * 60 * 2;

          if (elapsedTime < expirationTime) {
            setSpotifyAccessToken(cachedAccessToken);
            setNewReleasesData(JSON.parse(cachedReleases));
            setLoading(false);
            return;
          }
        }

        const newAccessToken = await getSpotifyAccessTokenFromRefresh();
        setSpotifyAccessToken(newAccessToken);
        const releases = await newReleases(newAccessToken);
        setNewReleasesData(releases.albums.items);


        // Cache data in local storage with timestamp
        localStorage.setItem('spotifyAccessToken', newAccessToken);
        localStorage.setItem('newReleasesData', JSON.stringify(releases.albums.items));
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
      <UploadArea />
      <br />
      <br />
      <br />
      <br />
      {loading && <Loading />}
      {!loading && error && <p>Error: {error.message}</p>}
      {!loading && !error && <NewReleases newReleasesData={newReleasesData} />}
      <Footer />
    </div>
  );
}

export default HomePage;
