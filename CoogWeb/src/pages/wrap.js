import React, {useState, useEffect} from 'react';
import purple_image from './purple_image.png';
import './wrap.css';

export const TopArtist = () => {
    const [artists, setArtists] = useState([]);
        const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchTopArtists = async () => {
                try {
                    const response = await fetch('http://localhost:5000/topartists', {
                        method: 'GET',
                    });
                    const data = await response.json();
    
                    if (data.success) {
                        setArtists(data.topArtists);  // Assuming the backend returns an array of artists
                    } else {
                        setError('Failed to fetch artists');
                    }
                } catch (err) {
                    setError('Error fetching artists');
                } finally {
                    setLoading(false);  // Data is loaded or error occurred
                }
            };
    
            fetchTopArtists();
        }, []);  // Empty dependency array to run this only once when the component mounts
    
        if (loading) return <div>Loading artists...</div>;
        if (error) return <div>{error}</div>;

    return (
        <div className="top-artist-list">
            {artists.map((artist, index) => (
                <TopArtistCard key={index} artist={artist} />
            ))}
        </div>
    );
}

export const TopArtistCard = ({ artist }) => {
    return (
        <div className="top-artist-card">
            <img src={artist.image_url} alt={artist.username} className="top-artist-image" />
            <h3 className="top-artist-name">{artist.username}</h3>
        </div>
    );
};

export const TopSongList = () => {
    const [songs, setSongs] = useState([]);
        const [loading, setLoading] = useState(true);  // To track loading state
        const [error, setError] = useState(null);
    
        useEffect(() => {
            const fetchTopSongs = async () => {
                try {
                    const response = await fetch('http://localhost:5000/topsongs', {
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
    
            fetchTopSongs();
        }, []);  
    
        if (loading) return <div>Loading songs...</div>;
        if (error) return <div>{error}</div>;

    return (
        <div className="top-song-list">
            {songs.map((song, index) => (
                <TopSongCard key={index} song={song} />
            ))}
        </div>
    );
};

export const TopSongCard = ({ song }) => {
    return (
        <div className="topsong-card">
            <h3 className="topsong-rank">{song.ranks}</h3>
            <img src={song.image_url} alt={song.name} className="topsong-image" />
            <h3 className="topsong-name">{song.name}</h3>
            <h3 className="topsong-artist">{song._name}</h3>
        </div>
    );
};

export const TopAlbum = () => {
    const [topalbum] = useState([
        { id: 1, name: "Mayhem", photo: purple_image, artist: "Lady Gaga" },
        { id: 2, name: "Short n' Sweet", photo: purple_image, artist: "Sabrina Carpenter"},
        { id: 3, name: "Brat", photo: purple_image, artist: "Charlie XCX" },
    ]);

    return (
        <div className="top-album-list">
            {topalbum.map((topalbum) => (
                <TopAlbumCard key={topalbum.id} topalbum={topalbum} />
            ))}
        </div>
    );
}

export const TopAlbumCard = ({ topalbum }) => {
    return (
        <div className="top-album-card">
            <img src={topalbum.photo} alt={topalbum.name} className="top-album-image" />
            <h3 className="top-album-name">{topalbum.name}</h3>
            <p className="top-album-artist">{topalbum.artist}</p>
        </div>
    );
};

export const TopGenre = () => {
    const [topgenres] = useState([
        { id: 1, name: "Pop"},
        { id: 2, name: "Rap"},
        { id: 3, name: "K-Pop"}
    ]);

    return (
        <div className="top-genre-list">
            {topgenres.map((topgenre) => (
                <TopGenreCard key={topgenre.id} topgenre={topgenre} />
            ))}
        </div>
    );
};

export const TopGenreCard = ({ topgenre }) => {
    return (
        <div className="top-genre-card"> {/* Fixed class name here */}
            <h3 className="top-genre-name">{topgenre.name}</h3>
        </div>
    );
};

export const Other = () => {
    const [others, setOthers] = useState({
        TotalStreams: 1000000,
        TotalUsers: 100000,
        TotalArtists: 1000,
        TotalAlbums: 10000,
        TotalGenres: 100,
        TotalPlaylists: 1000,
        TotalLikes: 100000,
    });

    // Convert the `others` object into an array of key-value pairs
    const othersArray = Object.entries(others);

    return (
        <div className="other-list">
            {othersArray.map(([key, value]) => (
                <OtherCard key={key} label={key} value={value} />
            ))}
        </div>
    );
};

export const OtherCard = ({ label, value }) => {
    // Format the label to be more readable (e.g., "totalstreams" -> "Total Streams")
    const formattedLabel = label
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()) // Capitalize the first letter
        .replace("total", ""); // Remove the word "total"

    return (
        <div className="other-card">
            <h3 className="other-label">{formattedLabel}</h3>
            <p className="other-value">{value.toLocaleString()}</p> {/* Format numbers with commas */}
        </div>
    );
};


export const TopTrending = () => {
    return (
        <section className = "Trending-Page">
        <div className="trending-section">
            <div className="trending-header">
                <h2>Top Trending</h2>
            </div>
        </div>

        <div className="top-artists-section">
            <div className="top-artists-header">Top 3 Artists of the Week! 
            </div>
            <TopArtist />
        </div>

        <div className="top-songs-section">
            <div className="top-songs-header">Top 10 Songs of the Week! 
            </div>
            <TopSongList />
        </div>

        <div className="top-albums-section">
            <div className="top-albums-header">Top 3 Albums of the Week! 
            </div>
            <TopAlbum />
        </div>

        <div className="top-genres-section">
            <div className="top-genres-header">Top 3 Genres of the Week! 
            </div>
            <TopGenre />
        </div>

        <div className="Other-Sections">
            <div className = "other-header"> Miscellaneous Information
            </div>
            <Other />
        </div>
        </section>
    );
};
