import React, { useEffect, useState } from 'react';
import Header from '../Header';
import Profile from './Profile';

const EditProfile = () => {
    return (
        <div>
            <Header />
            <h1 className='profile-header'>Edit Profile</h1>
            <Profile />
        </div>
    );
}

export default EditProfile;