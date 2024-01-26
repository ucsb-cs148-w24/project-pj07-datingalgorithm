import React from 'react';
import './Header.css';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';

const Header = () => {
    return (
        <div className='header'>
            <IconButton>
                <img src={require("./res/eye-mask.png")}
                    width = {50}
                    height = {50}
                    float = "right"
                />
            </IconButton>
            
            <h1>Blindly</h1>
            
        </div>
    );
}

export default Header;