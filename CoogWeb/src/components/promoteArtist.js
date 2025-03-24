import React, { useState } from 'react';
import { promoteArtist } from '../services/api';

const PromoteArtist = () => {
  const [artistId, setArtistId] = useState('');
  const [message, setMessage] = useState('');

  const handlePromotion = async () => {
    const result = await promoteArtist(artistId);
    setMessage(result.message);
  };

  return (
    <div className="container">
      <h2> Promote Artist</h2>
      <input
        type="text"
        value={artistId}
        onChange={(e) => setArtistId(e.target.value)}
        placeholder="Enter Artist ID"
      />
      <button onClick={handlePromotion}>Promote Artist</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PromoteArtist;
