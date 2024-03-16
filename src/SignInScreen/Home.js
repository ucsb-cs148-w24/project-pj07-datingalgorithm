import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle, signOutUser } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import googleIcon from "../images/googleicon.png";

const Home = () => {
    const [user, setUser] = useState(null); // Track user state
    const [errorMessage, setErrorMessage] = useState(null);
    // const [errorTimer, setErrorTimer] = useState(null);
    const navigate = useNavigate();

    const handleAbout = () => {
        navigate('./about');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Set user if signed in, or null if signed out
        });
        return () => unsubscribe(); // Clean up subscription
    }, []);

    const handleAuthAction = () => {
        if (user) {
            signOutUser().then(() => {
                console.log("User signed out");
                // Additional sign-out logic here if necessary
            });
        } else {
            signInWithGoogle()
                .then(() => {
                    console.log("User signed in");
                    //navigate('/makeProfile')
                
                    // Additional sign-in logic here if necessary

                    // go to profile creation page
                })
                .catch((error) => {
                    console.error("Error during sign-in:", error);
                    // Show the error message
                    setErrorMessage("Only UCSB students are accepted");

                    // Clear the error message after 2 seconds
                    const timer = setTimeout(() => {
                        setErrorMessage(null);
                    }, 2000);

                    // Save the timer ID to clear it if needed (e.g., if the user closes the pop-up)

                });
        }
    };

    return (
        <div className='overlay'>
            <div className="container">
                <p className='home-h1'>Blindly</p>
                <h2 className='text1'>Meet Blindly, Love Truly</h2>
                <button onClick={handleAuthAction} className="primary-button">
                <img
                        src= {googleIcon} // Replace "image-url.jpg" with the URL or path to your image
                        alt=""
                        className= "googleicon"// Set the width and height of the image
                    />
                    {user ? 'Sign Out' : 'Sign In with Google'}
                </button>
            </div>
                <button onClick={handleAbout} className="about-button">About Us 
                </button>
            {errorMessage && (
                <div className="error-popup">
                    <p>{errorMessage}</p>
                </div>
            )}
        </div>
        
    );
};

export default Home;