import React from 'react';
import { signOutUser } from './firebaseConfig';
import { useNavigate } from 'react-router-dom'
import './SignOutButton.css'

const SignOutButton = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOutUser();
            console.log("User signed out successfully.");
            navigate('/')
        } catch (error) {
            console.error("Error during sign out:", error);
        }
    };

    return (
        <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
        </button>
    );
};

export default SignOutButton;
