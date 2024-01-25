import React from 'react';
import './Header.css';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const Header = () => {
    return (
        <div className='header'>
            <IconButton>
                <HomeIcon className='header__icon' />
            </IconButton>
            
            <h1>Blindly</h1>
            <IconButton>
                <img src={'./res/eye-mask.png'} />
            </IconButton>
        </div>
    );
}

export default Header;