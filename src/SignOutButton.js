import React from 'react';
import { signOutUser } from './firebaseConfig';
import { useNavigate } from 'react-router-dom'
import './SignOutButton.css'

function LogOutIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="20"
        viewBox="-6 -4 27 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
      </svg>
    )
  }

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
            <LogOutIcon className="ml-2 h-4 w-4" />
        </button>
    );
};

export default SignOutButton;
