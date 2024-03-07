import React from 'react';
import { useNavigate } from 'react-router-dom'
import './About.css'

const About = () => {

    const navigate = useNavigate();

    const backToHome = async () => {
        navigate('/');
    };

    return (
      <><div className="about-container">
            <h1>About Blindly</h1>
            <p>
                Blindly is a dating app designed with privacy and genuine connections in mind.
                Our mission is to help UCSB students find meaningful relationships without the biases
                of physical appearance. 
            </p>
            <div className="signature-line">Love Blindly, Meet Truly!</div>
            <h2>Meet the Team</h2>
        <div className="developer-profiles">
          <div className="developer-profile">
            <h3>Koray Kondakci</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on the development of home screen and log in feature.</p>
          </div>
          <div className="developer-profile">
            <h3>Emre Cikisir</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on the development of home screen and log in feature.</p>
          </div>
          <div className="developer-profile">
            <h3>Palvi Sabherwal</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on profile creation page and creating the questionnaire.</p>
          </div>
          <div className="developer-profile">
            <h3>Emily Thai</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on profile creation page and creating the questionnaire.</p>
          </div>
          <div className="developer-profile">
            <h3>Vedant Shah</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on the swipe screen and chat feature.</p>
          </div>
          <div className="developer-profile">
            <h3>Nirmit Ashar</h3>
            <p>4th year Computer Science major at UCSB, worked mainly on the swipe screen and chat feature.</p>
          </div>
          <div className="developer-profile">
            <h3>Xinyan Zhao</h3>
            <p>3rd year Computer Science major at UCSB, worked mainly on the swipe screen and chat feature.</p>
          </div>
        </div>
        </div><button onClick={backToHome} className="about-back-btn">&#8592; 
            </button></>
    );
  };
export default About;