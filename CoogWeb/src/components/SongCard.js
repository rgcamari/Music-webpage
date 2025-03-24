import React, { useState } from 'react';
import { likeSong, streamSong } from '../services/songService';

const SongCard = ({ song, userId, currentSong, setCurrentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async () => {
    try {
      // If the song is different from the current playing song
      if (currentSong !== song.song_id) {
        const result = await streamSong(song.song_id, userId);
        window.open(result.song_url, '_blank');
        setCurrentSong(song.song_id); // Set current playing song
      } else {
        window.open(song.song_url, '_blank');
      }
      setIsPlaying(true);
    } catch (err) {
      console.error('Error streaming song:', err.message);
    }
  };

  const handleLike = async () => {
    try {
      await likeSong(song.song_id, userId);
      alert('Song liked successfully!');
    } catch (err) {
      console.error('Error liking song:', err.message);
    }
  };

  return (
    <div className="song-card">
      <img src={song.image_url || '/assets/default-cover.jpg'} alt={song.name} />
      <h3>{song.name}</h3>
      <p>Artist: {song.artist_name}</p>
      <button onClick={handlePlay}>
        {isPlaying && currentSong === song.song_id ? '⏸️ Pause' : '▶️ Play'}
      </button>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default SongCard;
