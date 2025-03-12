import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './input.css';

export const PlaylistList = () => {
    const [playlists] = useState([
        { id: 1, name: "Mayhem", photo: purple_image },
        { id: 2, name: "Harlequin", photo: purple_image },
        { id: 3, name: "Love for Sale", photo: purple_image },
        { id: 4, name: "Dawn of Chromatica", photo: purple_image },
        { id: 5, name: "Joanne", photo: purple_image },
        { id: 6, name: "Cheek to Cheek", photo: purple_image },
        { id: 7, name: "Born this way", photo: purple_image },
        { id: 8, name: "The Fame", photo: purple_image },
        { id: 9, name: "Abracadabra", photo: purple_image }
    ]);

    return (
        <div className="playlist-list">
            {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
        </div>
    );
}

export const PlaylistCard = ({ playlist }) => {
    return (
        <div className="playlist-card">
            <img src={playlist.photo} alt={playlist.name} className="playlist-image" />
            <h3 className="playlist-name">{playlist.name}</h3>
        </div>
    );
};



export const Profile = () => {
    const [stats, setStats] = useState({
        following: 120,  // Example count
        friends: 85,     // Example count
        likedSongs: 300, // Example count
    });

    return (
        <section className = "everything">
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

        <div className="playlist-section">
            <div className="playlist-header">Your Platlists: 
            <button className="create-playlist-button">Create Playlist</button>
            </div>
            <PlaylistList />
        </div>
        </section>
    );
};