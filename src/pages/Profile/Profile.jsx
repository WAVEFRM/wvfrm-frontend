import React from 'react';
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
export default function Profile() {
  return (
    
    
    <div className="profile-container" >
      <Navbar />
     <ProfileCard />
     <Footer />
    </div>
    
  );
}
