import React, {useState, useEffect} from 'react';
import purple_image from './purple_image.png';
import heart from './heart.png';
import './sections.css';
import play_button from './play.png';
import forward from './forward.png';
import { ArtistView, AlbumViewPage, PlaylistViewPage } from './view';
import { BottomBar } from './home';

const MusicPlayer = () => {
    const [currentSong, setCurrentSong] = useState(null);
  
    return (
      <div>
        {/* Render SongCard and pass setCurrentSong */}
        <SongList setCurrentSong={setCurrentSong} />
  
        {/* Pass currentSong to BottomBar */}
        <BottomBar currentSong={currentSong} />
      </div>
    );
  };

export const SongList = ({accountType, userId, setCurrentSong}) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('http://localhost:5000/songlist', {
                    method: 'GET',
                });
                const data = await response.json();

                if (data.success) {
                    setSongs(data.songs);  // Assuming the backend returns an array of artists
                } else {
                    setError('Failed to fetch songs');
                }
            } catch (err) {
                setError('Error fetching songs');
            } finally {
                setLoading(false);  // Data is loaded or error occurred
            }
        };

        fetchSongs();
    }, []);  

    if (loading) return <div>Loading songs...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="song-list">
            {songs.map((song, index) => (
                <SongCard key={index} song={song} accountType={accountType} userId={userId} setCurrentSong={setCurrentSong} />
            ))}
        </div>
    );
};

export const SongCard = ({ song, accountType, userId , setCurrentSong}) => {
    const [isLiked, setIsLiked] = useState(false); // State to track if the heart is "liked"
    const [imageBase64, setImageBase64] = useState(null); // State to hold the base64 image

    useEffect(() => {
        if (song.image) {
            setImageBase64(song.image); // Directly set the base64 string
        }
    }, [song.image]);

    if (accountType == 'user') {
    useEffect(() => {
        const fetchInitialLike = async () => {
            try {
                const response = await fetch('http://localhost:5000/initiallike', {
                    method: 'POST',
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userId:userId, song_id:song.song_id }), 
                });
                const data = await response.json();

                if (data.success) {
                    setIsLiked(data.isLiked);  // Assuming the backend returns an array of artists
                } else {
                    setError('Failed to fetch like status');
                }
            } catch (err) {
                setError('Error fetching like status');
            } 
        };

        fetchInitialLike();
    }, [userId]);  
}
const handleHeartClick = async () => {
    if (isLiked) {
        // Unlike the song
        try {
            const response = await fetch(`http://localhost:5000/unlikesong`, {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId:userId, song_id:song.song_id }), 
            });
            if (response.ok) {
                setIsLiked(false);
            }
        } catch (error) {
            console.error("Error unliking the song:", error);
        }
    } else {
        // Like the song
        try {
            const response = await fetch("http://localhost:5000/likesong", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: userId,
                    song_id: song.song_id,
                }),
            });
            if (response.ok) {
                setIsLiked(true);
            }
        } catch (error) {
            console.error("Error liking the song:", error);
        }
    }
};

    return (
        <div className="song-card">
            {/* Render Base64 Image */}
            {imageBase64 && (
                <img
                    src={`data:image/png;base64,${imageBase64}`} 
                    alt={song.name} 
                    className="song-image"
                />
            )}

            <h3 className="song-name">{song.name}</h3>
            <h3 className="song-artist">{song.artist_name}</h3>

            {/* Render Audio Player for Song */}
            {song.song_url && (
                <audio controls>
                    <source src={`data:audio/mp3;base64,${song.song_url}`} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )}

            <div className="bottom-section">
                {accountType !== 'artist' && accountType !== 'admin' && (
                    <img
                        src={heart}
                        alt="heart"
                        className={`heart-image ${isLiked ? "liked" : ""}`}
                        onClick={handleHeartClick}
                    />
                )}
                <button onClick={() => setCurrentSong(song)} className="play-button">
                <img src={play_button} alt="Play" className="play"/>
                </button>
            </div>
        </div>
    );
};

export const ArtistList = ({onArtistClick}) => {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch('http://localhost:5000/artistlist', {
                    method: 'GET',
                });
                const data = await response.json();

                if (data.success) {
                    setArtists(data.artists);  // Assuming the backend returns an array of artists
                } else {
                    setError('Failed to fetch artists');
                }
            } catch (err) {
                setError('Error fetching artists');
            } finally {
                setLoading(false);  // Data is loaded or error occurred
            }
        };

        fetchArtists();
    }, []);  // Empty dependency array to run this only once when the component mounts

    if (loading) return <div>Loading artists...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="artist-list">
          {artists.map((artist, index) => (
            <ArtistCard key={index} artist={artist} onArtistClick={onArtistClick} />
          ))}
        </div>
      );
}

export const ArtistCard = ({ artist, onArtistClick }) => {
    return (
      <div className="artist-card">
        <img src={artist.image_url} alt={artist.username} className="artist-image" />
        <h3 className="artist-name">{artist.username}</h3>
        <button onClick={() => onArtistClick('artist-view', artist)} className="forward-button">
          <img src={forward} alt="forward" className="forward-icon" />
        </button>
      </div>
    );
};

  export const AlbumList = ({ onAlbumClick, accountType, userId}) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await fetch('http://localhost:5000/albumlist', {
                    method: 'GET',
                });
                const data = await response.json();

                if (data.success) {
                    setAlbums(data.albums);  // Assuming the backend returns an array of artists
                } else {
                    setError('Failed to fetch artists');
                }
            } catch (err) {
                setError('Error fetching artists');
            } finally {
                setLoading(false);  // Data is loaded or error occurred
            }
        };

        fetchAlbums();
    }, []);  // Empty dependency array to run this only once when the component mounts

    if (loading) return <div>Loading albums...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="album-list">
            {albums.map((album, index) => (
                <AlbumCard key={index} album={album} onAlbumClick={onAlbumClick} accountType={accountType} userId={userId}/>
            ))}
        </div>
    );
};


export const AlbumCard = ({ album, onAlbumClick, accountType,userId }) => {
    const [isLiked, setIsLiked] = useState(false); // State to track if the heart is "liked"
  
    if (accountType == 'user') {
        useEffect(() => {
            const fetchInitialLike = async () => {
                try {
                    const response = await fetch('http://localhost:5000/albuminitiallike', {
                        method: 'POST',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ userId:userId, album_id:album.album_id }), 
                    });
                    const data = await response.json();
    
                    if (data.success) {
                        setIsLiked(data.isLiked);  // Assuming the backend returns an array of artists
                    } else {
                        setError('Failed to fetch like status');
                    }
                } catch (err) {
                    setError('Error fetching like status');
                } 
            };
    
            fetchInitialLike();
        }, [userId]);  
    }
    const handleHeartClick = async () => {
        if (isLiked) {
            // Unlike the song
            try {
                const response = await fetch(`http://localhost:5000/albumunlikesong`, {
                    method: 'POST',
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ userId:userId, album_id:album.album_id }), 
                });
                if (response.ok) {
                    setIsLiked(false);
                }
            } catch (error) {
                console.error("Error unliking the album:", error);
            }
        } else {
            // Like the song
            try {
                const response = await fetch("http://localhost:5000/albumlikesong", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: userId,
                        album_id: album.album_id,
                    }),
                });
                if (response.ok) {
                    setIsLiked(true);
                }
            } catch (error) {
                console.error("Error liking the album:", error);
            }
        }
    };
  
    return (
      <div className="album-card">
        <img src={album.photo} alt={album.album_name} className="album-image" />
        <h3 className="album-name">{album.album_name}</h3>
        <h3 className="album-artist">{album.artist_username}</h3>
        <div className="bottom-section">
        {accountType !== 'artist' && accountType !== 'admin'  && (
          <img
            src={heart} // Use the same heart image
            alt="heart"
            className={`heart-image ${isLiked ? "liked" : ""}`} // Add class if liked
            onClick={handleHeartClick} // Handle click event
          />)}
          <button onClick={() => onAlbumClick('album-view-page',album)} className="forward-button">
            <img src={forward} alt="forward" className="forward-icon" />
          </button>
        </div>
      </div>
    );
  };

export const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/userlist', {
                    method: 'GET',
                });
                const data = await response.json();

                if (data.success) {
                    setUsers(data.users);  // Assuming the backend returns an array of artists
                } else {
                    setError('Failed to fetch users');
                }
            } catch (err) {
                setError('Error fetching users');
            } finally {
                setLoading(false);  // Data is loaded or error occurred
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array to run this only once when the component mounts

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="user-list">
            {users.map((user, index) => (
                <UserCard key={index} user={user} />
            ))}
        </div>
    );
}

export const UserCard = ({ user }) => {
    
    return (
        <div className="user-card">
            <img src={user.image_url} alt={user.username} className="user-image" />
            <h3 className="user-name">{user.username}</h3>
        </div>
    );
};

export const SearchSection = ({ accountType, userId, setCurrentSong }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/search?term=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
      });
      const data = await response.json();

      if (response.ok && data.success) {
        setResults(data.songs);
      } else {
        setError(data.message || 'No results found.');
      }
    } catch (err) {
      setError('Error fetching search results.');
    } finally {
      setLoading(false);
    }
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
*/  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a song..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="search-results">
        {results.map((song, index) => (
          <SongCard
            key={index}
            song={song}
            accountType={accountType}
            userId={userId}
            setCurrentSong={setCurrentSong}
          />
        ))}
      </div>
    </div>
  );
};