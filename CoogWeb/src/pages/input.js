import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './input.css';

export const Profile = () => {

    return (
        <div className="profile-section">
            <div className="profile-header">
                <img src={purple_image} alt="Profile" className="profile-image" />
                <h2 className="profile-username">Dom...urmom</h2>
            </div>
        </div>
    );
};