import React from 'react';
import { likeSong, streamSong } from '../services/songService';

const SongCard = ({ song, userId }) => {
  const handleLike = async () => {
    try {
      await likeSong(song.song_id, userId);
      alert('Song liked successfully!');
    } catch (err) {
      console.error('Error liking song:', err.message);
    }
  };

  const handlePlay = async () => {
    try {
      const result = await streamSong(song.song_id, userId);
      window.open(result.song_url, '_blank');
    } catch (err) {
      console.error('Error streaming song:', err.message);
    }
  };

  return (
    <div className="song-card">
      <img src={song.image_url || '/assets/default-cover.jpg'} alt={song.name} />
      <h3>{song.name}</h3>
      <p>Artist: {song.artist_name}</p>
      <button onClick={handlePlay}> Play</button>
      <button onClick={handleLike}> Like</button>
    </div>
  );
};

export default SongCard;
