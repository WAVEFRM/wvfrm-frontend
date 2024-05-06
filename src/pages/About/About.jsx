import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './About.css';

const About = () => {
  // Define the URL for the Lottie animation
  // const logo = require('../../assets/user.png');

  const ajay = require('../../assets/Ajay.jpeg');
  const ashis = require('../../assets/Ashis.jpeg');
  const sidharth = require('../../assets/Sidharth.jpeg');
  const alby = require('../../assets/Alby.jpg'); 


  return (
    <>
      <Navbar />
      {/* About Us Section */}
      <div className="aboutus-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="aboutus">
                <h2 className="aboutus-title">About Us</h2>
                <p className="aboutus-text">
                  We aim to provide artists with valuable insights into the potential success of their tracks. 
                  <br/>
                  <br/>
                  We recognize the challenges artists face in the music industry and strive to offer practical solutions driven by data.
                </p>
               
              </div>
            </div>
            <div className="col-md-5 col-sm-6 col-xs-12">
              <div className="feature">
                <div className="feature-box">
                  <div className="clearfix">
                    <div className="iconset">
                      <span className="glyphicon glyphicon-cog icon"></span>
                    </div>
                    <div className="feature-content">
                      <h4> Approach </h4>
                      <p>
                      We utilize a two-fold approach to predict the popularity of new music. 
                      By leveraging the Spotify API and Librosa, we extract audio features to deliver accurate predictions for a song's success.
                      </p>
                    </div>
                  </div> 
                </div>
                <div className="feature-box">
                  <div className="clearfix">
                    <div className="iconset">
                      <span className="glyphicon glyphicon-cog icon"></span>
                    </div>
                    <div className="feature-content">
                      <h4> Insights</h4>
                      <p>
                      Our platform offers artists detailed insights into their music's characteristics like tempo, energy, loudness
                      </p>
                    </div>
                  </div>
                </div>
                <div className="feature-box">
                  <div className="clearfix">
                    <div className="iconset">
                      <span className="glyphicon glyphicon-cog icon"></span>
                    </div>
                    <div className="feature-content">
                      <h4>Support</h4>
                      <p>
                      Analyzing a track before release or strategizing marketing efforts,
                       Waveform supports artists in making informed decisions to maximize their impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <div className="ourTeam">
        <div className="Team">
          <h1>Our Team</h1>
          <div className="profile-card">
            <div className="img">
              <img src={ashis} alt="Ashis Solomon" />
            </div>
            <div className="caption">
              <br />
              <h3>Ashis Solomon</h3>
              <p>Web Developer</p>
              <div className="social-links">
                <a href="https://github.com/ashis-solomon" target="_blank">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/ashis-solomon-1477001b8/" target="_blank">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
          {/* Second team member card */}
          <div className="profile-card">
            <div className="img">
              <img src={ajay} alt="Ajay Binod" />
            </div>
            <div className="caption">
              <br />
              <h3>Ajay Binod</h3>
              <p>Web Developer</p>
              <div className="social-links">
                <a href="https://github.com/27Ajay2003" target="_blank">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/ajay-binod-bb7597200/" target="_blank">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
          {/* Third team member card here */}
          <div className="profile-card">
            <div className="img">
              <img src={sidharth} alt="Sidharth Menon S" />
            </div>
            <div className="caption">
              <br />
              <h3>Sidharth Menon S</h3>
              <p>Web Developer</p>
              <div className="social-links">
                <a href="https://github.com/sms2002" target="_blank">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/sidharth-menon-s-8893b8200/" target="_blank">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
          {/* Fourth team member card */}
          <div className="profile-card">
            <div className="img">
              <img src={alby} alt="Alby Thekkadan" />
            </div>
            <div className="caption">
              <br />
              <h3>Alby Thekkadan</h3>
              <p>Web Developer</p>
              <div className="social-links">
                <a href="https://github.com/albymat32" target="_blank">
                  <FaGithub size={30} />
                </a>
                <a href="https://www.linkedin.com/in/alby-thekkedan-3b2871210/" target="_blank">
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
