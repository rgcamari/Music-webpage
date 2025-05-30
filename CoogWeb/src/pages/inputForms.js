import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './inputForms.css';

export const SongForm = ({userName, userId}) => {
    const [song, setSong] = useState({
        name: "",
        artist: userId,
        genre: "",
        album: "",
        image: null,
        URL: null
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [previewAudio, setPreviewAudio] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the uploaded file is a JPEG
            if (file.type === "image/png") {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Convert to Base64
                reader.onloadend = () => {
                    setSong({ ...song, image: reader.result }); // Store as Base64 string
                };
            } else {
                alert("Only JPEG images are allowed!");
            }
        }
    };
    
    
    const handleSongUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if the uploaded file is an MP3
            if (file.type === "audio/mp3") {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Convert to Base64
                reader.onloadend = () => {
                    setSong({ ...song, URL: reader.result }); // Store as Base64 string
                };
            } else {
                alert("Only MP3 audio files are allowed!");
            }
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Song submitted:", song);
        
        try {
          const response = await fetch('http://localhost:5000/createsong', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(song),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song added successfully!");
                setSong({ name: "", artist: userId,genre: "", album: "", image: "", URL: "" }); // Reset form
            } else {
                alert("Failed to add song: " + data.message);
            }
        } catch (error) {
            console.error("Error adding song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="file" name="image" placeholder="Enter image name" accept="image/png" onChange={handleImageUpload}  />

            <label>Song URL</label>
            <input type="file" name="URL" placeholder="Enter song URL" accept="audio/mp3" onChange={handleSongUpload} required />

            <button type="submit">Create</button>
        </form>
        </section>
    );
}

export const SongFormEdit = ({userName,userId}) => {
    const [song, setSong] = useState({
        prevName: "",
        name: "",
        artist: userId,
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Song submitted:", song);
        
        try {
          const response = await fetch('http://localhost:5000/editsong', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(song),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song edited successfully!");
                setSong({ prevName: "", name: "", artist: userId,genre: "", image: ""}); // Reset form
            } else {
                alert("Failed to edit song: " + data.message);
            }
        } catch (error) {
            console.error("Error editing song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="prevName" placeholder="Enter song name" value={song.prevName} onChange={handleChange} required />
            
            <label>Song Name</label>
            <input type="text" name="name" placeholder="Enter song name" value={song.name} onChange={handleChange} />

            <label>Genre Name</label>
            <input type="text" name="genre" placeholder="Enter genre" value={song.genre} onChange={handleChange} />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={song.image} onChange={handleChange} />

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const SongFormDelete = ({userName,userId}) => {
    const [song, setSong] = useState({
        name: "",
        artist: userId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong({ ...song, [name]: value });
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log("Song submitted:", song);
            
            try {
              const response = await fetch('http://localhost:5000/deletesong', {
                method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({name: song.name,
                artist: song.artist}),
            });
    
            const data = await response.json();
                
                if (response.ok) {
                    alert("Song deleted successfully!");
                    setSong({name: "", artist: userId}); // Reset form
                } else {
                    alert("Failed to delete song: " + data.message);
                }
            } catch (error) {
                console.error("Error deleting song:", error);
                alert("Error connecting to the server.");
            }
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


export const AlbumForm = ({userId, userName}) => {
    const [album, setAlbum] = useState({
        name: "",
        artist: userId,
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        
        try {
          const response = await fetch('http://localhost:5000/addalbum', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(album),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Album added successfully!");
                setAlbum({ name: "", artist: userId,genre: "",image: ""}); // Reset form
            } else {
                alert("Failed to add album: " + data.message);
            }
        } catch (error) {
            console.error("Error adding album:", error);
            alert("Error connecting to the server.");
        }
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

export const AlbumFormAdd = ({userName, userId}) => {
    const [album, setAlbum] = useState({
        name: "",
        artist: userId,
        song_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        
        try {
          const response = await fetch('http://localhost:5000/addingsongtoalbum', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(album),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song added successfully!");
                setAlbum({ name: "", artist: userId,song_name: ""}); // Reset form
            } else {
                alert("Failed to add song: " + data.message);
            }
        } catch (error) {
            console.error("Error adding song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="song_name" placeholder="Enter song name" value={album.song_name} onChange={handleChange} required />

            <button type="submit">Add</button>
        </form>
        </section>
    );
}

export const AlbumFormEdit = ({userName,userId}) => {
    const [album, setAlbum] = useState({
        prevName: "",
        name: "",
        artist: userId,
        genre: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('http://localhost:5000/editalbum', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(album),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Album edited successfully!");
                setAlbum({ prevName: "", name: "", artist: userId,genre: "", image: ""}); // Reset form
            } else {
                alert("Failed to edit song: " + data.message);
            }
        } catch (error) {
            console.error("Error editing song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="prevName" placeholder="Enter album name" value={album.prevName} onChange={handleChange} required />

            <label>Album Name</label>
            <input type="text" name="name" placeholder="Enter album name" value={album.name} onChange={handleChange}  />

            <label>Genre Name</label>
            <input type="text" name="genre" placeholder="Enter genre" value={album.genre} onChange={handleChange}  />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={album.image} onChange={handleChange}  />

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const AlbumFormDelete = ({userName, userId}) => {
    const [album, setAlbum] = useState({
        name: "",
        artist: userId
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };
        const handleSubmit = async (e) => {
            e.preventDefault();
            
            try {
              const response = await fetch('http://localhost:5000/deletealbum', {
                method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(album),
            });
    
            const data = await response.json();
                
                if (response.ok) {
                    alert("Album deleted successfully!");
                    setAlbum({name: "", artist: userId}); // Reset form
                } else {
                    alert("Failed to delete album: " + data.message);
                }
            } catch (error) {
                console.error("Error deleting album:", error);
                alert("Error connecting to the server.");
            }
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

export const AlbumFormRemove = ({userName, userId}) => {
    const [album, setAlbum] = useState({
        name: "",
        artist: userId,
        song_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAlbum({ ...album, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Album submitted:", album);
        
        try {
          const response = await fetch('http://localhost:5000/removesongfromalbum', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(album),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song removed successfully!");
                setAlbum({ name: "", artist: userId,song_name: ""}); // Reset form
            } else {
                alert("Failed to remove song: " + data.message);
            }
        } catch (error) {
            console.error("Error removing song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="song_name" placeholder="Enter album name" value={album.song_name} onChange={handleChange} required />

            <button type="submit">Remove</button>
        </form>
        </section>
    );
}

export const PlaylistForm = ({userName, userId}) => {
    const [playlist, setPlaylist] = useState({
        name: "",
        user: userId,
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        
        try {
          const response = await fetch('http://localhost:5000/createplaylist', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(playlist),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Playlist added successfully!");
                setPlaylist({ name: "", user: userId,image: ""}); // Reset form
            } else {
                alert("Failed to add playlist: " + data.message);
            }
        } catch (error) {
            console.error("Error adding playlist:", error);
            alert("Error connecting to the server.");
        }
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

export const PlaylistFormAdd = ({userName, userId}) => {
    const [playlist, setplaylist] = useState({
        name: "",
        user: userId,
        song_name: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setplaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        
        try {
          const response = await fetch('http://localhost:5000/addsongtoplaylist', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(playlist),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song added successfully!");
                setplaylist({ name: "", user: userId,song_name: ""}); // Reset form
            } else {
                alert("Failed to add song: " + data.message);
            }
        } catch (error) {
            console.error("Error adding song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="song_name" placeholder="Enter song name" value={playlist.song_name} onChange={handleChange} required />

            <button type="submit">Add</button>
        </form>
        </section>
    );
}

export const PlaylistFormEdit = ({userName, userId}) => {
    const [playlist, setPlaylist] = useState({
        prevName: "",
        name: "",
        user: userId,
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('http://localhost:5000/editplaylist', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(playlist),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Playlist edited successfully!");
                setPlaylist({ prevName: playlist.prevName, name: "", user: userId, image: ""}); // Reset form
            } else {
                alert("Failed to edit playlist: " + data.message);
            }
        } catch (error) {
            console.error("Error editing playlist:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="prevName" placeholder="Enter playlist name" value={playlist.prevName} onChange={handleChange} required />

            <label>Playlist Name</label>
            <input type="text" name="name" placeholder="Enter playlist name" value={playlist.name} onChange={handleChange}  />

            <label>Image Name</label>
            <input type="text" name="image" placeholder="Enter image name" value={playlist.image} onChange={handleChange}  />

            <button type="submit">Edit</button>
        </form>
        </section>
    );
}

export const PlaylistFormDelete = ({userName, userId}) => {
    const [playlist, setPlaylist] = useState({
        name: "",
        user: userId,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const response = await fetch('http://localhost:5000/deleteplaylist', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(playlist),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Playlist deleted successfully!");
                setPlaylist({name: "", user: userId}); // Reset form
            } else {
                alert("Failed to delete playlist: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting playlist:", error);
            alert("Error connecting to the server.");
        }
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

export const PlaylistFormRemove = ({userName, userId}) => {
    const [playlist, setPlaylist] = useState({
        name: "",
        user: userId,
        song_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaylist({ ...playlist, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Playlist submitted:", playlist);
        
        try {
          const response = await fetch('http://localhost:5000/removeplaylistsong', {
            method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(playlist),
        });

        const data = await response.json();
            
            if (response.ok) {
                alert("Song removed successfully!");
                setPlaylist({ name: "", user: userId,song_name: ""}); // Reset form
            } else {
                alert("Failed to remove song: " + data.message);
            }
        } catch (error) {
            console.error("Error removing song:", error);
            alert("Error connecting to the server.");
        }
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
            <input type="text" name="song_name" placeholder="Enter song name" value={playlist.song_name} onChange={handleChange} required />

            <button type="submit">Remove</button>
        </form>
        </section>
    );
}