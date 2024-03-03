import React from 'react'
import './Header.css';
import logo from './images/eye-mask.png';
import SignOutButton from './SignOutButton';
import {Link} from 'react-router-dom';
import ChatButton from './chatButton';

function Header() {
    return (
        <div className="Header">
            <Link to={`/swipe`}>
                <div className='logo'>
                    <img src={logo} alt="Blindly Logo" className="logoImage" />
                    <h1>Blindly</h1>
                </div>
            </Link>

            <ChatButton />
            
            <SignOutButton/>
        </div>
    )
  }

export default Header
