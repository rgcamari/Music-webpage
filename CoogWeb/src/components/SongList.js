import React, { useState, useEffect } from 'react';
import { getSongs } from '../services/songService';
import SongCard from './SongCard';

const SongList = ({ userId }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      const data = await getSongs();
      setSongs(data);
    };
    fetchSongs();
  }, []);

  return (
    <div className="song-list">
      {songs.map((song) => (
        <SongCard
          key={song.song_id}
          song={song}
          userId={userId}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      ))}
    </div>
  );
};

export default SongList;
