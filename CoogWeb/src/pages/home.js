import React, { useState, useRef, useEffect, } from 'react';
import purple_image from './purple_image.png';
import './home.css';
import { SongList, ArtistList, AlbumList, UserList } from './sections';
import { Profile, ArtistProfile } from './input';
import { TopTrending } from './wrap';
import { CougarWrapUp } from './userWrap';
import { ArtistView, AlbumViewPage, PlaylistViewPage } from './view';
import { SongForm, SongFormDelete, SongFormEdit, AlbumForm, AlbumFormAdd, AlbumFormDelete, AlbumFormEdit, AlbumFormRemove, PlaylistForm,PlaylistFormAdd, PlaylistFormDelete, PlaylistFormEdit, PlaylistFormRemove } from './inputForms';
import pause_button from './pause_button.png';
import play_button from './play_button.png';
import { useLocation } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';


const TopBar = ({ username, userimage }) => {
  const navigate = useNavigate();
  console.log('TopBar props:', { username, userimage });

  return (
    <div className="top-bar">
      <div className="user-infos">
        <img src={userimage} className="user-images" />
        <span className="username">{username}</span>
      </div>
      <div className="top-bar-buttons">
        <button className="settings-button" onClick={() => navigate('/settings')}>Settings</button>
        <button className="main-menu-button" onClick={() => navigate('/')}>Main Menu</button>
      </div>
      <div className="project-name">
        <img src={purple_image} className="project-image" />
        <h1>Coog Music</h1>
      </div>
    </div>
  );
};

// SideBar Component
const SideBar = ({ onButtonClick, accountType }) => {
  
  return (
    <div className="side-bar">
      <button className="side-bar-button" onClick={() => onButtonClick('song-list')}>Song List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('artist-list')}>Artist List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('album-list')}>Album List</button>
      {accountType !== 'artist' && (
        <button className="side-bar-button" onClick={() => onButtonClick('user-lists')}>User List</button>
      )}
      {accountType !== 'artist' && (
        <button className="side-bar-button" onClick={() => onButtonClick('profile')}>Profile</button>
      )}
      {accountType !== 'user' && (
        <button className="side-bar-button" onClick={() => onButtonClick('artist-profile')}>Artist Profile</button>
      )}
      <button className="side-bar-button" onClick={() => onButtonClick('top-trending')}>Top Trending</button>
      <button className="side-bar-button" onClick={() => onButtonClick('cougar-wrap-up')}>Cougar Wrap-Up</button>
    </div>
  );
};

export const BottomBar = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Ensure currentSong is never null
  const song = currentSong || tempSong;

  // Ensure audio src updates when the song changes
  useEffect(() => {
    console.log("Audio ref:", audioRef.current); // Debugging
    if (audioRef.current) {
      console.log("Setting audio src:", song.url); // Debugging
      audioRef.current.src = song.url; // Set the src explicitly
      console.log("Audio element src after setting:", audioRef.current.src); // Debugging
      setIsPlaying(false); // Reset play state
    }
  }, [song]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      console.log("Audio src:", audioRef.current.src); // Debugging
      console.log("Audio paused:", audioRef.current.paused); // Debugging
      if (!isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            console.log("Playback started"); // Debugging
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error("Playback failed:", error); // Debugging
          });
      } else {
        audioRef.current.pause();
        console.log("Playback paused"); // Debugging
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="bottom-bar">
      <div className="now-playing">
        <img src={song.photo} alt={song.name} className="song-photo" />
        <span className="current-song-name">{song.name}</span>
      </div>
      <button className="play-pause-btn" onClick={togglePlayPause}>
        <img
          src={isPlaying ? pause_button : play_button}
          alt={isPlaying ? 'Pause' : 'Play'}
          className="play-pause-image"
        />
      </button>
      {/* Audio element with ref and src */}
      <audio ref={audioRef} src={song.url} />
    </div>
  );
};


const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, userName, accountType, userImage } = location.state || {};
  

  const [currentSong, setCurrentSong] = useState({
      name: "Dawn of Change",
      url: "/dawnofchange.mp3", // Ensure this path is correct
      photo: purple_image, // Ensure this is imported or a valid path
  });

  const [activeScreen, setActiveScreen] = useState('song-list'); // Default to Song List
  const [selectedArtist, setSelectedArtist] = useState({});

  const handleArtistClick = (screen, artist) => {
    setActiveScreen(screen);
    setSelectedArtist(artist);
  };


  const handleAlbumClick = (screen) => {
    setActiveScreen(screen);
  };

  const handlePlaylistClick = (screen) => {
    setActiveScreen(screen);
  };


  return (
    <div className="Home">
      <TopBar username={userName} userImage={userImage}/>
      <div className="content">
        <SideBar onButtonClick={setActiveScreen} accountType={accountType} />
        <div className="main-content">
          {renderScreen(activeScreen, handleArtistClick, handleAlbumClick, handlePlaylistClick, accountType, selectedArtist)}
        </div>
      </div>
      <BottomBar currentSong={currentSong} />
    </div>
  );
};

// Separate function for rendering screens
const renderScreen = (activeScreen, onArtistClick, onAlbumClick, onPlaylistClick, accountType, selectedArtist) => {
  switch (activeScreen) {
    case 'song-list': return <SongList />;
    case 'artist-list': return <ArtistList onArtistClick={onArtistClick} />;
    case 'album-list': return <AlbumList onAlbumClick={onAlbumClick} />;
    case 'profile': return <Profile setActiveScreen={onPlaylistClick} />;
    case 'artist-profile': return <ArtistProfile setActiveScreen={onArtistClick} />;
    case 'top-trending': return <TopTrending />;
    case 'cougar-wrap-up': return <CougarWrapUp />;
    case 'user-lists': return <UserList />;
    case 'artist-view': return <ArtistView artist={selectedArtist} accountType={accountType}/>;
    case 'album-view-page': return <AlbumViewPage artist={selectedArtist}/>;
    case 'create-song': return <SongForm />;
    case 'edit-song': return <SongFormEdit />;
    case 'delete-song': return <SongFormDelete />;
    case 'create-album': return <AlbumForm />;
    case 'edit-album': return <AlbumFormEdit />;
    case 'delete-album': return <AlbumFormDelete />;
    case 'add-song-album': return <AlbumFormAdd />;
    case 'remove-song-album': return <AlbumFormRemove />;
    case 'create-playlist': return <PlaylistForm />;
    case 'edit-playlist': return <PlaylistFormEdit />;
    case 'delete-playlist': return <PlaylistFormDelete />;
    case 'add-song-playlist': return <PlaylistFormAdd />;
    case 'remove-song-playlist': return <PlaylistFormRemove />;
    case 'playlist-view': return <PlaylistViewPage />;
    default: return <SongList />;
  }
};

export default Home;