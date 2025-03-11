import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './sections.css';


export const SongList = () => {
    const [songs] = useState([
        { id: 1, name: "Blinding Lights", photo: purple_image },
        { id: 2, name: "Shape of You", photo: purple_image },
        { id: 3, name: "Someone Like You", photo: purple_image },
        { id: 4, name: "Uptown Funk", photo: purple_image },
        { id: 5, name: "Levitating", photo: purple_image },
        { id: 6, name: "Levitating", photo: purple_image },
        { id: 7, name: "Levitating", photo: purple_image },
        { id: 8, name: "Levitating", photo: purple_image },
        { id: 9, name: "Levitating", photo: purple_image }
    ]);

    return (
        <div className="song-list">
            {songs.map((song) => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
    );
};

export const SongCard = ({ song }) => {
    return (
        <div className="song-card">
            <img src={song.photo} alt={song.name} className="song-image" />
            <h3 className="song-name">{song.name}</h3>
        </div>
    );
};



export const ArtistList = () => <div>Artist List</div>;
export const AlbumList = () => <div>Album List</div>;
export const Profile = () => <div>Profile</div>;
export const TopTrending = () => <div>Top Trending</div>;
export const CougarWrapUp = () => <div>Cougar Wrap-Up</div>;



/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SongList.css'; // Create this for styling

const SongList = () => {
    const [songs, setSongs] = useState([]); // State to store songs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch songs from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:5000/songs')  // Replace with your actual API endpoint
            .then(response => {
                setSongs(response.data); // Store the fetched songs
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching songs:', err);
                setError('Failed to load songs');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading songs...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="song-list">
            {songs.map((song) => (
                <SongCard key={song.id} song={song} />
            ))}
        </div>
    );
};

// Reusable Card Component for Each Song
const SongCard = ({ song }) => {
    return (
        <div className="song-card">
            <img src={song.photo} alt={song.name} className="song-image" />
            <h3 className="song-name">{song.name}</h3>
        </div>
    );
};

export default SongList;
*/