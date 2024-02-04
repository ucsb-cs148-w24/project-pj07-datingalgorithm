// src/Header.js

import React from 'react'
import './Header.css';
import logo from './eye-mask.png';

function Header() {
    return (
        <div className="Header">
            <img src={logo} alt="Blindly Logo" className="logo" />
            <h1>Blindly</h1>
        </div>
    )
}

export default Header
