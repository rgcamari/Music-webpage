import React, {useState} from 'react';
import purple_image from './purple_image.png';
import heart from './heart.png';
import './sections.css';
import play_button from './play.png';
import forward from './forward.png';
import { ArtistView, AlbumViewPage, PlaylistViewPage } from './view';


export const SongList = () => {
    const [songs] = useState([
        { id: 1, name: "Blinding Lights", photo: purple_image,artist: "Lady Gaga" },
        { id: 2, name: "Shape of You", photo: purple_image,artist: "Lady Gaga" },
        { id: 3, name: "Someone Like You", photo: purple_image,artist: "Lady Gaga" },
        { id: 4, name: "Uptown Funk", photo: purple_image,artist: "Lady Gaga" },
        { id: 5, name: "Levitating", photo: purple_image,artist: "Lady Gaga" },
        { id: 6, name: "Levitating", photo: purple_image,artist: "Lady Gaga" },
        { id: 7, name: "Levitating", photo: purple_image,artist: "Lady Gaga" },
        { id: 8, name: "Levitating", photo: purple_image,artist: "Lady Gaga" },
        { id: 9, name: "Levitating", photo: purple_image,artist: "Lady Gaga" }
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
    const [isLiked, setIsLiked] = useState(false); // State to track if the heart is "liked"

    const handleHeartClick = () => {
        setIsLiked(!isLiked); // Toggle the liked state
    };

    return (
        <div className="song-card">
            <img src={song.photo} alt={song.name} className="song-image" />
            <h3 className="song-name">{song.name}</h3>
            <h3 className="song-artist">{song.artist}</h3>
            <div className="bottom-section">
                <img
                    src={heart} // Use the same heart image
                    alt="heart"
                    className={`heart-image ${isLiked ? "liked" : ""}`} // Add class if liked
                    onClick={handleHeartClick} // Handle click event
                />
                <img src={play_button} alt="play" className="play-button" />
            </div>
        </div>
    );
};

export const ArtistList = ({onArtistClick}) => {
    const [artists] = useState([
        { id: 1, name: "Ariana Grande", photo: purple_image },
        { id: 2, name: "The Beatles", photo: purple_image },
        { id: 3, name: "Zutomayo", photo: purple_image },
        { id: 4, name: "Lady Gaga", photo: purple_image },
        { id: 5, name: "Nightcore @ 25", photo: purple_image },
        { id: 6, name: "Taylor Swift", photo: purple_image },
        { id: 7, name: "Rick Montgomery", photo: purple_image },
        { id: 8, name: "Doechii", photo: purple_image },
        { id: 9, name: "Deco*27", photo: purple_image }
    ]);

    return (
        <div className="artist-list">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} onArtistClick={onArtistClick} />
          ))}
        </div>
      );
}

export const ArtistCard = ({ artist, onArtistClick }) => {
    return (
      <div className="artist-card">
        <img src={artist.photo} alt={artist.name} className="artist-image" />
        <h3 className="artist-name">{artist.name}</h3>
        <button onClick={() => onArtistClick('artist-view')} className="forward-button">
          <img src={forward} alt="forward" className="forward-icon" />
        </button>
      </div>
    );
  };

  export const AlbumList = ({ onAlbumClick }) => {
    const [albums] = useState([
        { id: 1, name: "Mayhem", photo: purple_image, artist: "Lady Gaga" },
        { id: 2, name: "Harlequin", photo: purple_image, artist: "Lady Gaga" },
        { id: 3, name: "Love for Sale", photo: purple_image, artist: "Lady Gaga" },
        { id: 4, name: "Dawn of Chromatica", photo: purple_image, artist: "Lady Gaga" },
        { id: 5, name: "Joanne", photo: purple_image, artist: "Lady Gaga" },
        { id: 6, name: "Cheek to Cheek", photo: purple_image, artist: "Lady Gaga" },
        { id: 7, name: "Born this way", photo: purple_image, artist: "Lady Gaga" },
        { id: 8, name: "The Fame", photo: purple_image, artist: "Lady Gaga" },
        { id: 9, name: "Abracadabra", photo: purple_image, artist: "Lady Gaga" }
    ]);

    return (
        <div className="album-list">
            {albums.map((album) => (
                <AlbumCard key={album.id} album={album} onAlbumClick={onAlbumClick} />
            ))}
        </div>
    );
};


export const AlbumCard = ({ album, onAlbumClick }) => {
    const [isLiked, setIsLiked] = useState(false); // State to track if the heart is "liked"
  
    const handleHeartClick = () => {
      setIsLiked(!isLiked); // Toggle the liked state
    };
  
    return (
      <div className="album-card">
        <img src={album.photo} alt={album.name} className="album-image" />
        <h3 className="album-name">{album.name}</h3>
        <h3 className="album-artist">{album.artist}</h3>
        <div className="bottom-section">
          <img
            src={heart} // Use the same heart image
            alt="heart"
            className={`heart-image ${isLiked ? "liked" : ""}`} // Add class if liked
            onClick={handleHeartClick} // Handle click event
          />
          <button onClick={() => onAlbumClick('album-view-page')} className="forward-button">
            <img src={forward} alt="forward" className="forward-icon" />
          </button>
        </div>
      </div>
    );
  };

export const UserList = () => {
    const [users] = useState([
        { id: 1, name: "Ariana Grande", photo: purple_image, },
        { id: 2, name: "The Beatles", photo: purple_image },
        { id: 3, name: "Zutomayo", photo: purple_image },
        { id: 4, name: "Lady Gaga", photo: purple_image },
        { id: 5, name: "Nightcore @ 25", photo: purple_image },
        { id: 6, name: "Taylor Swift", photo: purple_image },
        { id: 7, name: "Rick Montgomery", photo: purple_image },
        { id: 8, name: "Doechii", photo: purple_image },
        { id: 9, name: "Deco*27", photo: purple_image }
    ]);

    return (
        <div className="user-list">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export const UserCard = ({ user }) => {
    
    return (
        <div className="user-card">
            <img src={user.photo} alt={user.name} className="user-image" />
            <h3 className="user-name">{user.name}</h3>
        </div>
    );
};


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