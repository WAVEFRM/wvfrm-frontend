import React from 'react';
import './SimilarSongs.css'
const SimilarSongsList = [
  {
    songName: "Song 1",
    artistName: "Artist 1",
    songImage: "https://i.scdn.co/image/ab67616d00001e0242c087c654e6c83eba52e7a3"
  },
  {
    songName: "Song 2",
    artistName: "Artist 2",
    songImage: "https://i.scdn.co/image/ab67706f00000002dec17246891b5b4eb97bdb0d"
  },
  {
    songName: "Song 3",
    artistName: "Artist 3",
    songImage: "https://i.scdn.co/image/ab67616d00001e02b54686226853e372258044ac"
  },
  {
    songName: "Song 4",
    artistName: "Artist 4",
    songImage: "https://i.scdn.co/image/ab67616d00001e02ac144fcdade3e1a420901705"
  },
  {
    songName: "Song 5",
    artistName: "Artist 5",
    songImage: "https://i.scdn.co/image/ab67616d00001e025f3ede47954a93aa03efe5f9"
  }
];

const SimilarSongs= () => {
    return (
        <div className="sim-heading"><h2>Similar songs</h2>
      <div className="songscard-list">
         
        {SimilarSongsList.map((data, index) => (
          <div className="songscard" key={index}>
            <img src={data.songImage} alt={data.songName} />
            <div className="songsdetails">
              <h2>{data.songName}</h2>
              <p>{data.artistName}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    );
  };
  
  export default SimilarSongs;

// import React from 'react';
// import './SimilarSongs.css';
// import Grid from '@mui/material/Grid';
// import ReleaseCard from '../../components/ReleaseCard/ReleaseCard';


// const SimilarSongs = (props) => {
//   const first5Releases=props.newReleasesData.slice(0,6);
//   return (
//     <div className="similar-songs-container">
//       <h2>Similar songs</h2>
//       <Grid container spacing={2}>
//         {first5Releases.map((release) => (
//           <Grid item xs={6} sm={4} md={2} key={release.id}>
//             <ReleaseCard release={release} />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default SimilarSongs;
