// src/Header.js

import React from 'react'
import './Header.css';
import logo from './images/eye-mask.png';
import SignOutButton from './SignOutButton';

function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="Blindly Logo" className="logo" />
            <h1>Blindly</h1>
            <SignOutButton/>
        </div>
    )
}

export default Header
