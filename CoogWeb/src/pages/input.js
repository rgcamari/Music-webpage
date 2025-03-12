import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './input.css';

export const Profile = () => {
    const [stats, setStats] = useState({
        following: 120,  // Example count
        friends: 85,     // Example count
        likedSongs: 300, // Example count
    });

    return (
        <div className="profile-section">
            <div className="profile-header">
                <img src={purple_image} alt="Profile" className="profile-image" />
                <h2 className="profile-username">Username</h2>
            </div>
            <div className="Basic-Stats">
                <p className="basic-stats-text"> Following: {stats.following}</p>
                <p className="basic-stats-text"> Friends: {stats.friends}</p>
                <p className="basic-stats-text"> Liked Songs: {stats.likedSongs}</p>
            </div>
        </div>
    );
};