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

export const SongFormEdit = () => {
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
                        <h2 className="input-username">Edit a Song!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Song Name you wish to Edit</label>
            <input type="text" name="name" placeholder="Enter song name" value={song.name} onChange={handleChange} required />
            
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

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const SongFormDelete = () => {
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
                        <h2 className="input-username">Delete a Song!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Song Name you wish to Delete</label>
            <input type="text" name="name" placeholder="Enter song name" value={song.name} onChange={handleChange} required />
            <button type="submit">Delete</button>
        </form>
        </section>
    );
}


export const AlbumForm = () => {
    const [album, setAlbum] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...album, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Create an Album!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Album Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <label>Genre Name</label>
            <input type="text" name="genre" placeholder="Enter genre" value={album.genre} onChange={handleChange} required />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={album.image} onChange={handleChange} required />

            <button type="submit">Create</button>
        </form>
        </section>
    );
}

export const AlbumFormAdd = () => {
    const [album, setAlbum] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...album, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Add a Song to an Album!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Album Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <label>Enter Song Name you want to Add to the Album</label>
            <input type="text" name="song" placeholder="Enter song name" value={album.song} onChange={handleChange} required />

            <button type="submit">Add</button>
        </form>
        </section>
    );
}

export const AlbumFormEdit = () => {
    const [album, setAlbum] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...album, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Edit an Album!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Album Name you want to Edit</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <label>Album Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <label>Genre Name</label>
            <input type="text" name="genre" placeholder="Enter genre" value={album.genre} onChange={handleChange} required />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={album.image} onChange={handleChange} required />

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const AlbumFormDelete = () => {
    const [album, setAlbum] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...album, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Delete an Album!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Album Name you want to Delete</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <button type="submit">Delete</button>
        </form>
        </section>
    );
}

export const AlbumFormRemove = () => {
    const [album, setAlbum] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...album, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Remove a Song from an Album!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Album Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange} required />

            <label>Enter Song Name you want to Remove</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.song} onChange={handleChange} required />

            <button type="submit">Remove</button>
        </form>
        </section>
    );
}

export const PlaylistForm = () => {
    const [playlist, setPlaylist] = useState({
        name: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...playlist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Create a Playlist!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Playlist Name</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange} required />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={playlist.image} onChange={handleChange} required />

            <button type="submit">Create</button>
        </form>
        </section>
    );
}

export const PlaylistFormAdd = () => {
    const [playlist, setplaylist] = useState({
        name: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...playlist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Add a Song to a Playlist!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Playlist Name</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange} required />

            <label>Enter Song Name you want to Add to the Playlist</label>
            <input type="text" name="song" placeholder="Enter song name" value={playlist.song} onChange={handleChange} required />

            <button type="submit">Add</button>
        </form>
        </section>
    );
}

export const PlaylistFormEdit = () => {
    const [playlist, setPlaylist] = useState({
        name: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...playlist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Edit a Playlist!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Playlist Name you want to Edit</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange} required />

            <label>Playlist Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={playlist.name} onChange={handleChange} required />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={playlist.image} onChange={handleChange} required />

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const PlaylistFormDelete = () => {
    const [playlist, setPlaylist] = useState({
        name: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...playlist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Delete a Playlist!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Playlist Name you want to Delete</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange} required />

            <button type="submit">Delete</button>
        </form>
        </section>
    );
}

export const PlaylistFormRemove = () => {
    const [playlist, setPlaylist] = useState({
        name: "",
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...playlist, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        // Here you can add logic to save the song data
    };

    return (
        <section className="everything">
        <div className="input-section">
                    <div className="profile-header">
                        <h2 className="input-username">Remove a Song from an Playlist!</h2>
                    </div>
        </div>
        <form className="song-form" onSubmit={handleSubmit}>
            <label>Enter Playlist Name</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange} required />

            <label>Enter Song Name you want to Remove</label>
            <input type="text" name="name" placeholder="Enter song name" value={playlist.song} onChange={handleChange} required />

            <button type="submit">Remove</button>
        </form>
        </section>
    );
}