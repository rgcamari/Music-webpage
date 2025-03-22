import React, {useState, useEffect} from 'react';
import purple_image from './purple_image.png';
import './input.css';
import {SongForm, SongFormDelete, SongFormEdit} from './inputForms.js';
import {PlaylistViewPage} from './view.js';
import forward from './forward.png';

export const PlaylistList = ({ onPlaylistClick }) => {
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
                <PlaylistCard key={playlist.id} playlist={playlist} onPlaylistClick={onPlaylistClick} />
            ))}
        </div>
    );
}

export const PlaylistCard = ({ playlist, onPlaylistClick }) => {
    return (
        <div className="playlist-card">
            <img src={playlist.photo} alt={playlist.name} className="playlist-image" />
            <h3 className="playlist-name">{playlist.name}</h3>
            <button className="forward-button" onClick={() => onPlaylistClick('playlist-view', playlist.id)}>
                <img src={forward} alt="forward" className="forward-icon" />
            </button>
        </div>
    );
};

export const Profile = ({ setActiveScreen }) => {
    const [stats] = useState({
        following: 120,  // Example count
        friends: 85,     // Example count
        likedSongs: 300, // Example count
    });

    return (
        <section className="everything">
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
                <div className="playlist-header">Your Playlists:
                    <button className="create-playlist-button" onClick={() => setActiveScreen('create-playlist')}>
                        Create Playlist
                    </button>
                    <button className="create-playlist-button" onClick={() => setActiveScreen('edit-playlist')}>
                        Edit Playlist
                    </button>
                    <button className="create-playlist-button" onClick={() => setActiveScreen('delete-playlist')}>
                        Delete Playlist
                    </button>
                    <button className="create-playlist-button" onClick={() => setActiveScreen('add-song-playlist')}>
                        Add Song
                    </button>
                    <button className="create-playlist-button" onClick={() => setActiveScreen('remove-song-playlist')}>
                        Remove Song
                    </button>
                </div>
                <PlaylistList onPlaylistClick={setActiveScreen} />
            </div>
        </section>
    );
};

export const AlbumProfileList = ({userName}) => {
    const [albums, setAlbums] = useState([]);
        const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
    
            useEffect(() => {
                const fetchArtistProfileAlbum = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/artistprofilealbum', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userName: userName }), 
                        })
                        console.log('Backend response:', response); 
    
                        const data = await response.json();
    
                        if (data.success) {
                            setAlbums(data.albums);  
                        } else {
                            setError('Failed to fetch albums');
                        }
                    } catch (err) {
                        setError('Error fetching albums');
                    } finally {
                        setLoading(false);  // Data is loaded or error occurred
                    }
                };
        
                fetchArtistProfileAlbum();
            }, [userName]);
            if (loading) return <div>Loading albums...</div>;
            if (error) return <div>{error}</div>;

    return (
        <div className="albumProfile-list">
            {albums.map((album,index) => (
                <AlbumProfileCard key={index} album={album} />
            ))}
        </div>
    );
}

export const AlbumProfileCard = ({ album }) => {
    return (
        <div className="albumProfile-card">
            <img src={album.album_image} alt={album.album_name} className="albumProfile-image" />
            <h3 className="albumProfile-name">{album.album_name}</h3>
        </div>
    );
};

export const SongProfileList = ({userName}) => {
    const [songs, setSongs] = useState([]);
        const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
    
            useEffect(() => {
                const fetchArtistProfileSong = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/artistprofilesong', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userName: userName }), 
                        })
                        console.log('Backend response:', response); 
    
                        const data = await response.json();
    
                        if (data.success) {
                            setSongs(data.songs);  
                        } else {
                            setError('Failed to fetch songs');
                        }
                    } catch (err) {
                        setError('Error fetching songs');
                    } finally {
                        setLoading(false);  // Data is loaded or error occurred
                    }
                };
        
                fetchArtistProfileSong();
            }, [userName]);
            if (loading) return <div>Loading songs...</div>;
            if (error) return <div>{error}</div>;

    return (
        <div className="songProfile-list">
            {songs.map((song,index) => (
                <SongProfileCard key={index} song={song} />
            ))}
        </div>
    );
};

export const SongProfileCard = ({ song }) => {
    return (
        <div className="songProfile-card">
            <img src={song.song_image} alt={song.song_name} className="songProfile-image" />
            <h3 className="songProfile-name">{song.song_name}</h3>
            <h3 className="songProfile-album">{song.artist_name}</h3>
        </div>
    );
};

export const ArtistProfile = ({setActiveScreen, userName, userImage}) => {
    const [stats, setStats] = useState({
        followers: 0,
        streams: 0,
        likedSongs: 0,
        likedAlbums: 0,
    });

    const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
        
            useEffect(() => {
                const fetchArtistProfileInfo = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/artistprofileinfo', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userName }), 
                        });
                        const data = await response.json();
        
                        if (data.success) {
                            setStats({
                                followers: data.followers,
                                streams: data.streams,
                                likedSongs: data.likedSongs,
                                likedAlbums: data.likedAlbums});  
                        } else {
                            setError('Failed to fetch artist info');
                        }
                    } catch (err) {
                        setError('Error fetching artist info');
                    } finally {
                        setLoading(false);  // Data is loaded or error occurred
                    }
                };
        
                fetchArtistProfileInfo();
            }, [userName]);  // Empty dependency array to run this only once when the component mounts
    
        
            if (loading) return <div>Loading artists...</div>;
            if (error) return <div>{error}</div>;

    return (
        <section className = "everything">
        <div className="profile-section">
            <div className="profile-header">
                <img src={userImage} alt="Profile" className="profile-image" />
                <h2 className="profile-username">{userName}</h2>
            </div>
            <div className="Basic-Stats">
                <p className="basic-stats-text"> Followers: {stats.followers}</p>
                <p className="basic-stats-text"> Streams: {stats.streams}</p>
                <p className="basic-stats-text"> Liked Songs: {stats.likedSongs}</p>
                <p className="basic-stats-text"> Liked Songs: {stats.likedAlbums}</p>
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
            <AlbumProfileList userName={userName}/>
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
            <SongProfileList userName={userName}/>
            </div>
        
        </section>
    );
};