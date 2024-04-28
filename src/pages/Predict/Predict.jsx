import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Playback from '../../components/Playback/Playback';
import SimilarSongs from '../../components/SimilarSongs/SimilarSongs';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import './Predict.css';
import {
  getSpotifyAccessTokenFromRefresh,
  getAudioFeatures,
  getAudioFeature,
  getTrackDurations,
  getArtistDetails,
  getArtistsDetails,
  getAlbumIds,
  getAlbumTracks,
  getSimilarSongs,
} from '../../services/spotify/spotify-service';
import { highLevelPrediction } from '../../services/api/prediction-results';
import Loading from '../../components/Loading/Loading';
import { Explicit } from '@mui/icons-material';

function Predict() {
  // const [similarSongs, setsimilarSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trkID, setTrkID] = useState('');
  const [songDetails, setSongDetails] = useState(null);
  const [mostPopularArtistId, setMostPopularArtistId] = useState(null); // State which contains the most popular artist id
  const [spotifyAccessToken, setSpotifyAccessToken] = useState(null); // State to store Spotify access token
  const [albumIds, setAlbumIds] = useState([]); //
  const [albumTracks, setAlbumTracks] = useState([]);
  const [similarSongs, setSimilarSongs] = useState([]);
  const [finalObject, setFinalObject] = useState([]);
  const [durationOfProcess, setdurationOfProcess] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const startTime = performance.now();
        // Get Spotify access token
        const accessToken = await getSpotifyAccessTokenFromRefresh();
        setSpotifyAccessToken(accessToken);

        // Retrieve song details from localStorage
        const trackDetails = JSON.parse(localStorage.getItem('selectedSong'));
        setSongDetails(trackDetails);

        // Retrieve artist details and find the ID of the most popular artist
        if (trackDetails && accessToken) {
          const artistIds = trackDetails.artists_name.map((artist) => artist.id);
          console.log('Artist IDs:', artistIds);

          // Details of all artists who were involved in this particular song
          const artistDetails = await getArtistsDetails(accessToken, artistIds);
          console.log(artistDetails);

          // Get most popular artist id
          const mostPopularArtist = artistDetails.artists.reduce((prev, current) => {
            return prev.popularity > current.popularity ? prev : current;
          });
          console.log(mostPopularArtist);
          setMostPopularArtistId(mostPopularArtist.id);
          const mostPopArtistDetails = await getArtistDetails(accessToken, mostPopularArtist.id);

          //Getting simiar songs
          const similarSongs = await getSimilarSongs(
            accessToken,
            mostPopularArtist.id,
            mostPopArtistDetails.genres,
            trackDetails.id
          );
          console.log(similarSongs.tracks);
          const formattedReleases = similarSongs.tracks;
          console.log(formattedReleases);
          setSimilarSongs(formattedReleases);

          // Getting albums of most popular artist
          const albums = await getAlbumIds(accessToken, mostPopularArtist.id);
          setAlbumIds(albums);
          console.log(albums);

          // Get tracks from albums
          const tracks = await getAlbumTracks(accessToken, albums);
          setAlbumTracks(tracks);
          console.log(tracks);

          // Get track ids from tracks
          let trackIds = tracks.map((track) => track.id);
          console.log(trackIds);

          // Get durations of the tracks
          let trackDurations = await getTrackDurations(accessToken, trackIds);
          console.log(trackDurations);

          // Get audio features of the tracks
          let audioFeatures = await getAudioFeatures(accessToken, trackIds);
          console.log(audioFeatures);

          // Remove null audio features and corresponding data from other arrays
          const filteredData = audioFeatures.reduce(
            (acc, feature, index) => {
              if (feature !== null) {
                acc.filteredAudioFeatures.push(feature);
                acc.filteredTracks.push(trackIds[index]);
                acc.filteredTrackDurations.push(trackDurations[index]);
              }
              return acc;
            },
            {
              filteredAudioFeatures: [],
              filteredTracks: [],
              filteredTrackDurations: [],
            }
          );

          // Updated arrays after filtering null values
          audioFeatures = filteredData.filteredAudioFeatures;
          trackIds = filteredData.filteredTracks;
          trackDurations = filteredData.filteredTrackDurations;

          console.log(audioFeatures);
          console.log(trackIds);
          console.log(trackDurations);

          // Merged Data of both audio features and durations
          const mergedData = trackIds.map((id) => ({
            id,
            audioFeatures: audioFeatures.find((item) => item.id === id),
            duration_ms: trackDurations.find((item) => item.id === id)?.duration_ms,
            popularity: trackDurations.find((item) => item.id === id)?.popularity,
          }));
          //Sort based on popularity
          mergedData.sort((a, b) => {
            if (a.popularity > b.popularity) {
              return -1; // a should come before b
            } else if (a.popularity < b.popularity) {
              return 1; // b should come before a
            } else {
              return 0; // no change in order
            }
          });
          console.log(mergedData);

          //Remove duplicates based on subset given in docs
          const subset = [
            'danceability',
            'energy',
            'key',
            'loudness',
            'mode',
            'speechiness',
            'acousticness',
            'instrumentalness',
            'liveness',
            'valence',
            'tempo',
            'duration_ms',
            'time_signature',
            'name',
            'explicit',
          ];

          // Remove duplicates from mergedData based on subset
          const uniqueMergedData = mergedData.filter((track, index, self) => {
            // Convert track objects to strings based on the subset
            const trackString = JSON.stringify(subset.map((prop) => track[prop]));

            // Check if this trackString is the first occurrence in the array
            return (
              index ===
              self.findIndex((t) => {
                const tString = JSON.stringify(subset.map((prop) => t[prop]));
                return tString === trackString;
              })
            );
          });
          console.log(uniqueMergedData);

          //Aggregation of data

          const keys = [
            'danceability',
            'energy',
            'loudness',
            'speechiness',
            'duration_ms',
            'acousticness',
            'instrumentalness',
            'liveness',
            'valence',
            'tempo',
            'popularity',
          ];

          const aggregatedData = keys.reduce((aggregate, key) => {
            // Calculate the sum of values for each key
            let sum = 0;
            if (key === 'popularity' || key === 'duration_ms') {
              sum = uniqueMergedData.reduce((total, track) => {
                return total + track[key]; // Use directly from the track object
              }, 0);
            } else {
              sum = uniqueMergedData.reduce((total, track) => {
                // Access the nested property for "danceability", "energy", etc.
                return total + (track.audioFeatures[key] || 0); // If the key doesn't exist in the track object, default to 0
              }, 0);
            }

            // Calculate the average by dividing the sum by the number of tracks
            const average = sum / uniqueMergedData.length;

            // Add the sum and average to the aggregate object
            aggregate[key] = {
              sum,
              average,
            };

            return aggregate;
          }, {});

          const aggregatedJSON = {
            danceability_ar: aggregatedData.danceability.average,
            energy_ar: aggregatedData.energy.average,
            loudness_ar: aggregatedData.loudness.average,
            speechiness_ar: aggregatedData.speechiness.average,
            duration_ms_ar: aggregatedData.duration_ms.average,
            acousticness_ar: aggregatedData.acousticness.average,
            instrumentalness_ar: aggregatedData.instrumentalness.average,
            liveness_ar: aggregatedData.liveness.average,
            valence_ar: aggregatedData.valence.average,
            tempo_ar: aggregatedData.tempo.average,
            popularity_ar: aggregatedData.popularity.average,
          };

          console.log(aggregatedJSON);

          //Encoding of keys
          //For encoding firstly u need the audio features of the current track
          const audioFeature = await getAudioFeature(accessToken, trackDetails.id);
          console.log(audioFeature);

          //Now to encode using the audioFeature
          const keyEncoding = {};
          for (let i = 1; i <= 11; i++) {
            keyEncoding[`key_${i}`] = audioFeature.key === i ? 1.0 : 0.0;
          }
          console.log(keyEncoding);

          //Final JSON
          // Define the array of keys in the desired order
          const finalJson = [
            'acousticness',
            'danceability',
            'duration_ms',
            'energy',
            'explicit',
            'instrumentalness',
            'liveness',
            'loudness',
            'speechiness',
            'tempo',
            'valence',
            'year',
            'key_1',
            'key_2',
            'key_3',
            'key_4',
            'key_5',
            'key_6',
            'key_7',
            'key_8',
            'key_9',
            'key_10',
            'key_11',
            'mode',
            'acousticness_ar',
            'danceability_ar',
            'duration_ms_ar',
            'energy_ar',
            'instrumentalness_ar',
            'liveness_ar',
            'loudness_ar',
            'speechiness_ar',
            'tempo_ar',
            'valence_ar',
            'popularity_ar',
          ];

          // Initialize the result array
          const finalObject = {};

          // Iterate over each key and construct the corresponding value
          finalJson.forEach((key) => {
            let value;

            if (aggregatedJSON.hasOwnProperty(key)) {
              value = parseFloat(aggregatedJSON[key]); // Convert to float
            }
            // Check if the key exists in audioFeature
            else if (audioFeature.hasOwnProperty(key)) {
              value = parseFloat(audioFeature[key]); // Convert to float
            }
            // Check if the key exists in keyEncoding
            else if (keyEncoding.hasOwnProperty(key)) {
              value = parseFloat(keyEncoding[key]); // Convert to float
            }
            // If key does not exist in any of the objects, set it to 0
            else {
              value = 0.0; // Make sure it's a float
            }

            // Push the key-value pair into the result array
            finalObject[key] = value;
          });
          const releaseYear = parseFloat(trackDetails.relaseDate);
          finalObject['year'] = releaseYear;

          console.log(audioFeature);
          console.log(keyEncoding);
          console.log(aggregatedJSON);
          console.log(finalObject);

          const accessTokenBackend = localStorage.getItem('accessToken');
          const response = await highLevelPrediction(accessTokenBackend, finalObject);
          console.log(response);
          finalObject.prediction = response.output;
          console.log(finalObject);
          localStorage.setItem('finalObject', JSON.stringify(finalObject));
          setFinalObject(finalObject); // Final Object this is passed to the backend as body
          const endTime = performance.now(); // Record end time
          const durationOfProcess = endTime - startTime; // Calculate duration in milliseconds
          console.log(`Time taken for fetchData: ${durationOfProcess} milliseconds`);
          setdurationOfProcess(durationOfProcess);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };
    fetchData();
    return () => {
      setFinalObject(null);
    };
  }, []);
  useEffect(() => {
    const trackDetails = JSON.parse(localStorage.getItem('selectedSong'));
    if (trackDetails) {
      setTrkID(trackDetails.id); // Provide a track ID here
    }
  }, []);

  console.log(trkID);
  const trackUrl = `https://open.spotify.com/embed/track/${trkID}?utm_source=generator`;

  return (
    <div className="predictContainer">
      {loading ? ( // Render loading component if loading is true
        <Loading time={durationOfProcess} />
      ) : (
        <>
          <Playback trackUrl={trackUrl} finalObject={finalObject} />
          {finalObject && (
            <Link to={'/stat'}>
              <button className="playbackPredictbtn">Predict</button>
            </Link>
          )}
          <SimilarSongs similarSongs={similarSongs} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Predict;
