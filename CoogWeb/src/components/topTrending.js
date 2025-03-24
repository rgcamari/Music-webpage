import React, { useState, useEffect } from 'react';
import { getTopTrending } from '../services/api';

const TopTrending = () => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTopTrending();
      setTopSongs(data.songs);
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2> Top 50 Songs</h2>
      <ul>
        {topSongs.map((song, index) => (
          <li key={song._id}>
            {index + 1}. {song.title} by {song.artist} - {song.streams} streams
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTrending;
