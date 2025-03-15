import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './input.css';
import {SongForm, SongFormDelete, SongFormEdit} from './inputForms.js';

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

export const AlbumProfileList = () => {
    const [albumProfiles] = useState([
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
        <div className="albumProfile-list">
            {albumProfiles.map((albumProfile) => (
                <AlbumProfileCard key={albumProfile.id} albumProfile={albumProfile} />
            ))}
        </div>
    );
}

export const AlbumProfileCard = ({ albumProfile }) => {
    return (
        <div className="albumProfile-card">
            <img src={albumProfile.photo} alt={albumProfile.name} className="albumProfile-image" />
            <h3 className="albumProfile-name">{albumProfile.name}</h3>
        </div>
    );
};

export const SongProfileList = () => {
    const [songProfiles] = useState([
        { id: 1, name: "Blinding Lights", photo: purple_image, album: "The Weeknd" },
        { id: 2,name: "Shape of You", photo: purple_image, album: "Ed Sheeran" },
        { id: 3,name: "Someone Like You", photo: purple_image, album: "Adele" },
        { id: 4,name: "Uptown Funk", photo: purple_image, album: "Mark Ronson" },
        { id: 5,name: "Levitating", photo: purple_image, album: "Dua Lipa" },
        { id: 6,name: "Levitating", photo: purple_image, album: "Dua Lipa" },
        { id: 7,name: "Levitating", photo: purple_image, album: "Dua Lipa" },
        { id: 8,name: "Levitating", photo: purple_image, album: "Dua Lipa" },
        { id: 9,name: "Levitating", photo: purple_image, album: "Dua Lipa" },
        { id: 10,name: "Levitating", photo: purple_image, album: "Dua Lipa" }
    ]);

    return (
        <div className="songProfile-list">
            {songProfiles.map((songProfile) => (
                <SongProfileCard key={songProfile.id} songProfile={songProfile} />
            ))}
        </div>
    );
};

export const SongProfileCard = ({ songProfile }) => {
    return (
        <div className="songProfile-card">
            <img src={songProfile.photo} alt={songProfile.name} className="songProfile-image" />
            <h3 className="songProfile-name">{songProfile.name}</h3>
            <h3 className="songProfile-album">{songProfile.album}</h3>
        </div>
    );
};

export const ArtistProfile = ({setActiveScreen}) => {
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
        <div className="albumProfile-section">
                <div className="albumProfile-header">Your Albums: 
                <button
                        className="create-album-button"
                        onClick={() => setActiveScreen('create-album')}>
                        Create Album
                    </button>
                <button
                        className="create-album-button"
                        onClick={() => setActiveScreen('edit-album')}>
                        Edit Album
                    </button>
                <button
                        className="create-album-button"
                        onClick={() => setActiveScreen('delete-album')}>
                        Delete Album
                    </button>
                <button
                        className="create-album-button"
                        onClick={() => setActiveScreen('add-song-album')}>
                        Add Song
                    </button>
                <button
                        className="create-album-button"
                        onClick={() => setActiveScreen('remove-song-album')}>
                        Remove Song
                    </button>
                </div>
            <AlbumProfileList />
            </div>

            <div className="songProfile-section">
                <div className="songProfile-header">Your Songs: 
                <button
                        className="create-song-button"
                        onClick={() => setActiveScreen('create-song')}>
                        Create Song
                    </button>
                <button
                        className="create-song-button"
                        onClick={() => setActiveScreen('edit-song')}>
                        Edit Song
                    </button>
                <button
                        className="create-song-button"
                        onClick={() => setActiveScreen('delete-song')}>
                        Delete Song
                    </button>
                </div>
            <SongProfileList />
            </div>
        
        </section>
    );
};