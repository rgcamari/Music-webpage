import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './inputForms.css';

export const SongForm = () => {
    const [song, setSong] = useState({
        name: "",
        artist: "",
        album: "",
        image: "",
        URL: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Song submitted:", song);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Create a Song!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Song Name</label>
            <input type="text" name="name" placeholder="Enter song name" value={song.name} onChange={handleChange} required />

            <label>Genre Name</label>
            <input type="text" name="genre" placeholder="Enter genre" value={song.genre} onChange={handleChange} required />

            <label>Album Name</label>
            <input type="text" name="album" placeholder="Enter album name" value={song.album} onChange={handleChange} required />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={song.image} onChange={handleChange} required />

            <label>Song URL</label>
            <input type="text" name="URL" placeholder="Enter song URL" value={song.URL} onChange={handleChange} required />

            <button type="submit">Create</button>
        </form>
        </section>
    );
}