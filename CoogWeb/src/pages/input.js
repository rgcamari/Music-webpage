import React, {useState, useEffect} from 'react';
import purple_image from './purple_image.png';
import './input.css';
import {SongForm, SongFormDelete, SongFormEdit} from './inputForms.js';
import {PlaylistViewPage} from './view.js';
import forward from './forward.png';

export const PlaylistList = ({ onPlaylistClick, userName, userId }) => {
    const [playlists, setPlaylists] = useState([]);
        const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
    
            useEffect(() => {
                const fetchProfilePlaylist = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/profileplaylist', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userName }), 
                        })
                        console.log('Backend response:', response); 
    
                        const data = await response.json();
    
                        if (data.success) {
                            setPlaylists(data.playlists);  
                        } else {
                            setError('Failed to fetch playlists');
                        }
                    } catch (err) {
                        setError('Error fetching playlists');
                    } finally {
                        setLoading(false);  // Data is loaded or error occurred
                    }
                };
        
                fetchProfilePlaylist();
            }, [userName]);
            if (loading) return <div>Loading playlists...</div>;
            if (error) return <div>{error}</div>;
            console.log(playlists);
    return (
        <div className="playlist-list">
            {playlists.map((playlist,index) => (
                <PlaylistCard key={index} playlist={playlist} onPlaylistClick={onPlaylistClick}/>
            ))}
        </div>
    );
}

export const PlaylistCard = ({ playlist, onPlaylistClick}) => {
    return (
        <div className="playlist-card">
            <img src={playlist.playlist_image} alt={playlist.playlist_name} className="playlist-image" />
            <h3 className="playlist-name">{playlist.playlist_name}</h3>
            <button
                className="forward-button"
                onClick={() => onPlaylistClick('playlist-view', playlist)} // Pass the full playlist object
            >
                <img src={forward} alt="forward" className="forward-icon" />
            </button>
        </div>
    );
};

export const Profile = ({ setActiveScreen, onPlaylistClick,userName, userId, userImage}) => {
    const [stats, setStats] = useState({
        followers: 0,
        friends: 0,
        streams: 0,
        likedSongs: 0,
        likedAlbums: 0,
    });

    const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
        
            useEffect(() => {
                const fetchUserInfo = async () => {
                    try {
                        const response = await fetch('http://localhost:5000/infoforprofile', {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userName:userName}),
                        });
                        if (response.ok) {
                            const data = await response.json();
                            if (data.success) {
                                setStats({
                                    followers: data.followers,
                                    friends: data.friends,
                                    streams: data.streams,
                                    likedSongs: data.likedSongs,
                                    likedAlbums: data.likedAlbums,
                                });
                            } else {
                                setError('Failed to fetch user info');
                            }
                        } else {
                            setError('Failed to fetch user info');
                        }
                        
                    } catch (err) {
                        setError('Error fetching user info');
                    } finally {
                        setLoading(false);  // Data is loaded or error occurred
                    }
                };
        
                fetchUserInfo();
            }, [userName]);  
    
        
            if (loading) return <div>Loading user...</div>;
            if (error) return <div>{error}</div>;

    return (
        <section className="everything">
            <div className="profile-section">
                <div className="profile-header">
                    <img src={userImage} alt="Profile" className="profile-image" />
                    <h2 className="profile-username">{userName}</h2>
                </div>
                <div className="Basic-Stats">
                    <p className="basic-stats-text"> Following: {stats.followers}</p>
                    <p className="basic-stats-text"> Friends: {stats.friends}</p>
                    <p className="basic-stats-text"> Streams: {stats.streams}</p>
                    <p className="basic-stats-text"> Liked Songs: {stats.likedSongs}</p>
                    <p className="basic-stats-text"> Liked Albums: {stats.likedAlbums}</p>
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
                <PlaylistList onPlaylistClick={onPlaylistClick} userName={userName} userId={userId}/>
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


export const DataReport = ({userName}) => {
    return (
        <section className = "everything">
        <div className="profile-section">
            <div className="profile-header">
                <h2 className="profile-username">Coog Music Data Reports</h2>
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