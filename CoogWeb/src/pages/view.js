import React, {useState} from 'react';
import purple_image from './purple_image.png';
import heart from './heart.png';
import './view.css';
import play_button from './play.png';

export const AlbumViewList = () => {
    const [albumViews] = useState([
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
        <div className="albumView-list">
            {albumViews.map((albumView) => (
                <AlbumViewCard key={albumView.id} albumView={albumView} />
            ))}
        </div>
    );
}

export const AlbumViewCard = ({ albumView }) => {
    return (
        <div className="albumView-card">
            <img src={albumView.photo} alt={albumView.name} className="albumView-image" />
            <h3 className="albumView-name">{albumView.name}</h3>
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

export const ArtistView = ({ stats = {} }) => {
    return (
      <section className="everything">
        <div className="profile-section">
          <div className="profile-header">
            <img src={purple_image} alt="Profile" className="profile-image" />
            <h2 className="profile-username">Username</h2>
          </div>
          <div className="basic-stats">
            <p className="basic-stats-text">Follwers: {stats.followers || 0}</p>
            <p className="basic-stats-text">Streams: {stats.streams || 0}</p>
            <p className="basic-stats-text">Likes: {stats.likes || 0}</p>
            <button className="follow-button">Follow</button>
          </div>
        </div>
        <div className="albumView-section">
                        <div className="albumView-header">Albums: 
                        </div>
            <AlbumViewList />
        </div>

        <div className="songView-section">
                <div className="songView-header">Songs: 
                </div>
            <SongViewList />
        </div>
      </section>
    );
  };