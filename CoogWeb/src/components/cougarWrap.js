import React, { useState, useEffect } from 'react';
import { getCougarWrapUp } from '../services/api';

const CougarWrapUp = () => {
  const [wrapUp, setWrapUp] = useState({ topArtists: [], topAlbums: [], topSongs: [] });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCougarWrapUp();
      setWrapUp(data);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>📊 Cougar Wrap-Up</h2>

      <section>
        <h3>🎤 Top Artists</h3>
        <ul>
          {wrapUp.topArtists.map((artist) => (
            <li key={artist._id}>
              {artist._id} - {artist.streams} streams
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3> Top Albums</h3>
        <ul>
          {wrapUp.topAlbums.map((album) => (
            <li key={album._id}>
              {album._id} - {album.streams} streams
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3> Top Songs</h3>
        <ul>
          {wrapUp.topSongs.map((song) => (
            <li key={song._id}>{song.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CougarWrapUp;
