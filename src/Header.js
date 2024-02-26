import React from 'react'
import './Header.css';
import logo from './images/eye-mask.png';
import SignOutButton from './SignOutButton';

function Header() {
    return (
      <div className="Header">
        <div className="header-group">
          <img src={logo} alt="Blindly Logo" className="logo"/>
          <h1>Blindly</h1>
        </div>
        <SignOutButton/>
      </div>
    )
  }

export default Header
