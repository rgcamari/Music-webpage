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
        </section>
    );
};
export const CougarWrapUp = () => <div>Cougar Wrap-Up</div>;