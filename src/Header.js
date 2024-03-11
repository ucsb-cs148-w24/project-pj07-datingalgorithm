import React from 'react'
import './Header.css';
import logo from './images/eye-mask.png';
import SignOutButton from './SignOutButton';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';


function Header({showGoToSwipeButton = false}) {
    const navigate = useNavigate();

    const goToSwipeScreen = () => navigate('/swipe')

    return (
        <div className="Header">
            <Link to={`/swipe`}>
                <div className='logo'>
                    <img src={logo} alt="Blindly Logo" className="logoImage" />
                    <h1 className="header_name">Blindly</h1>
                </div>
            </Link>

            {showGoToSwipeButton && (
                <button onClick={goToSwipeScreen} className="goToSwipeButton">
                    Keep Swiping
                </button>
            )}
            
            <SignOutButton/>
        </div>
    )
  }

export default Header
