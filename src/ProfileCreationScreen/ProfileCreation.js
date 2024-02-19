import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Body from './Body';

const ProfileCreation = () => {
    return (
        <div>
            <Header />
            <h1 className='profile-header'>Create Profile</h1>
            <Body />
        </div>
    );
}

export default ProfileCreation;