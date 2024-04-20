import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import StatCards from '../../components/StatCards/StatCards';
import Footer from '../../components/Footer/Footer';
import HorizontalBarChart from '../../components/BarChart/HorizontalBarChart';
const Stat = () => {

    // FIX ME - should manually refresh to get local storage data or predict is slow
    
    const dataString = localStorage.getItem('finalObject')
    const data = JSON.parse(dataString);
    const songDataString = localStorage.getItem('selectedSong');
    const songData = JSON.parse(songDataString);
    console.log(data);
    const filteredData = {
        acousticness: data.acousticness*100,
        danceability: data.danceability*100,
        instrumentalness: data.instrumentalness*100,
        valence: data.valence*100,
        energy: data.energy*100,
        liveness: data.liveness*100,
        speechiness: data.speechiness*100
      };
      console.log(filteredData)
    // Now you can use the data as needed in your component

    return (
       <div>
        <Navbar />
        {/* Pass the data to StatCards component */}
        <StatCards data={data} songData={songData} />
        {/* CHART JS TO BE IMPLMENTED HERE */}
        <HorizontalBarChart datas={filteredData}/>
        <Footer />
       </div>
    );
}

export default Stat;
