import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './wrap.css';

export const TopArtist = () => {
    const [topartists] = useState([
        { id: 1, name: "Ariana Grande", photo: purple_image },
        { id: 2, name: "The Beatles", photo: purple_image },
        { id: 3, name: "Zutomayo", photo: purple_image },
    ]);

    return (
        <div className="top-artist-list">
            {topartists.map((topartist) => (
                <TopArtistCard key={topartist.id} topartist={topartist} />
            ))}
        </div>
    );
}

export const TopArtistCard = ({ topartist }) => {
    return (
        <div className="top-artist-card">
            <img src={topartist.photo} alt={topartist.name} className="top-artist-image" />
            <h3 className="top-artist-name">{topartist.name}</h3>
        </div>
    );
};

export const TopSongList = () => {
    const [topsongs] = useState([
        { id: 1, rank: 1, name: "Blinding Lights", photo: purple_image, artist: "The Weeknd" },
        { id: 2, rank: 2, name: "Shape of You", photo: purple_image, artist: "Ed Sheeran" },
        { id: 3, rank: 3, name: "Someone Like You", photo: purple_image, artist: "Adele" },
        { id: 4, rank: 4, name: "Uptown Funk", photo: purple_image, artist: "Mark Ronson" },
        { id: 5, rank: 5, name: "Levitating", photo: purple_image, artist: "Dua Lipa" },
        { id: 6, rank: 6, name: "Levitating", photo: purple_image, artist: "Dua Lipa" },
        { id: 7, rank: 7, name: "Levitating", photo: purple_image, artist: "Dua Lipa" },
        { id: 8, rank: 8, name: "Levitating", photo: purple_image, artist: "Dua Lipa" },
        { id: 9, rank: 9, name: "Levitating", photo: purple_image, artist: "Dua Lipa" },
        { id: 10, rank: 10, name: "Levitating", photo: purple_image, artist: "Dua Lipa" }
    ]);

    return (
        <div className="top-song-list">
            {topsongs.map((topsong) => (
                <TopSongCard key={topsong.id} topsong={topsong} />
            ))}
        </div>
    );
};

export const TopSongCard = ({ topsong }) => {
    return (
        <div className="topsong-card">
            <h3 className="topsong-rank">{topsong.rank}</h3>
            <img src={topsong.photo} alt={topsong.name} className="topsong-image" />
            <h3 className="topsong-name">{topsong.name}</h3>
            <h3 className="topsong-artist">{topsong.artist}</h3>
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
        </section>
    );
};
export const CougarWrapUp = () => <div>Cougar Wrap-Up</div>;