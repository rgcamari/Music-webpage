import React, {useState, useEffect} from 'react';
import purple_image from './purple_image.png';
import heart from './heart.png';
import './view.css';
import play_button from './play.png';

export const AlbumViewList = ({artist = {}}) => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);

        useEffect(() => {
            const fetchArtistAlbums = async () => {
                try {
                    const response = await fetch('http://localhost:5000/artistalbum', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: artist.username }), 
                    })
                    console.log('Backend response:', response); 

                    const data = await response.json();

                    if (data.success) {
                        setAlbums(data.albums);  
                    } else {
                        setError('Failed to fetch artists');
                    }
                } catch (err) {
                    setError('Error fetching artists');
                } finally {
                    setLoading(false);  // Data is loaded or error occurred
                }
            };
    
            fetchArtistAlbums();
        }, [artist.username]);
        if (loading) return <div>Loading albums...</div>;
        if (error) return <div>{error}</div>;

    return (
        <div className="albumView-list">
            {albums.map((album, index) => (
                <AlbumViewCard key={index} album={album} />
            ))}
        </div>
    );
}

export const AlbumViewCard = ({ album }) => {
    return (
        <div className="albumView-card">
            <img src={album.album_image} alt={album.album_name} className="albumView-image" />
            <h3 className="albumView-name">{album.album_name}</h3>
        </div>
    );
};

export const SongViewList = () => {
    const [songViews] = useState([
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
        <div className="songView-list">
            {songViews.map((songView) => (
                <SongViewCard key={songView.id} songView={songView} />
            ))}
        </div>
    );
};

export const SongViewCard = ({ songView }) => {
    return (
        <div className="songView-card">
            <img src={songView.photo} alt={songView.name} className="songView-image" />
            <h3 className="songView-name">{songView.name}</h3>
            <h3 className="songView-album">{songView.album}</h3>
        </div>
    );
};

export const ArtistView = ({ artist = {}, accountType }) => {
    const [info, setInfo] = useState({
        followers: 0,
        streams: 0,
        likedSongs: 0,
        likedAlbums: 0,
    });
    const [loading, setLoading] = useState(true);  // To track loading state
    const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchArtistInfo = async () => {
                try {
                    const response = await fetch('http://localhost:5000/artistview', {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username: artist.username }), 
                    });
                    const data = await response.json();
    
                    if (data.success) {
                        setInfo({
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
    
            fetchArtistInfo();
        }, []);  // Empty dependency array to run this only once when the component mounts

    
        if (loading) return <div>Loading artists...</div>;
        if (error) return <div>{error}</div>;
    return (
      <section className="everything">
        <div className="profile-section">
          <div className="profile-header">
            <img src={artist.image_url} alt="Profile" className="profile-image" />
            <h2 className="profile-username">{artist.username}</h2>
          </div>
          <div className="basic-stats">
            <p className="basic-stats-text">Followers: {info.followers}</p>
            <p className="basic-stats-text">Streams: {info.streams}</p>
            <p className="basic-stats-text">Liked Songs: {info.likedSongs}</p>
            <p className="basic-stats-text">Liked Albums: {info.likedAlbums}</p>
            {accountType !== 'artist' && (
            <button className="follow-button">Follow</button>
            )}
          </div>
        </div>
        <div className="albumView-section">
                        <div className="albumView-header">Albums: 
                        </div>
            <AlbumViewList artist={artist}/>
        </div>

        <div className="songView-section">
                <div className="songView-header">Songs: 
                </div>
            <SongViewList />
        </div>
      </section>
    );
  };

  export const AlbumViewPage = ({ album = {}}) => {
    const [isLiked, setIsLiked] = useState(false); // State to track if the heart is "liked"

    const handleHeartClick = () => {
        setIsLiked(!isLiked); // Toggle the liked state
    };

    return (
        <section className="everything">
            <div className="profile-section">
                <div className="profile-header">
                    <img src={album.photo || purple_image} alt="Album Cover" className="profile-image" />
                    <h2 className="profile-username">Album Name</h2>
                </div>
                <div className="basic-stats">
                    <p className="basic-stats-text">Songs: {album.songs || 0}</p>
                    <p className="basic-stats-text">Streams: {album.streams || 0}</p>
                    <p className="basic-stats-text">Likes: {album.likes || 0}</p>
                    <img
                        src={heart} // Use the same heart image
                        alt="heart"
                        className={`heart-image ${isLiked ? "liked" : ""}`} // Add class if liked
                        onClick={handleHeartClick} // Handle click event
                    />
                </div>
            </div>

            <div className="songView-section">
                <div className="songView-header">Songs: </div>
                <SongViewList songs={album.songs} /> {/* Pass album's songs list */}
            </div>
        </section>
    );
};

export const PlaylistViewPage = ({ playlist = {} }) => {

    return (
        <section className="everything">
            <div className="profile-section">
                <div className="profile-header">
                    <img src={playlist.photo || purple_image} alt="Playlist Cover" className="profile-image" />
                    <h2 className="profile-username">Playlist Name</h2>
                </div>
                <div className="basic-stats">
                    <p className="basic-stats-text">Songs: {playlist.songs || 0}</p>
                    <p className="basic-stats-text">Streams: {playlist.streams || 0}</p>
                </div>
            </div>

            <div className="songView-section">
                <div className="songView-header">Songs: </div>
                <SongViewList songs={playlist.songs} /> {/* Pass album's songs list */}
            </div>
        </section>
    );
};