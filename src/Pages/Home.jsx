import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import SearchUpload from '../Components/SearchUpload/SearchUpload';
import Footer from '../Components/Footer/Footer';
import NewReleases from '../Components/NewReleases/NewReleases';

const Home = () => {
    return (
        <div>
            <Navbar />
            <SearchUpload />
            <NewReleases />
            <Footer />
        </div>
    );
}

export default Home;
