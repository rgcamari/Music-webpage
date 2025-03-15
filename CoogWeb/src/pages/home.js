import React, { useState } from 'react';
import purple_image from './purple_image.png';
import './home.css';
import { SongList, ArtistList, AlbumList, UserList } from './sections';
import { Profile, ArtistProfile } from './input';
import { TopTrending } from './wrap';
import { CougarWrapUp } from './userWrap';
import { ArtistView, AlbumViewPage, PlaylistViewPage } from './view';
import { SongForm, SongFormDelete, SongFormEdit, AlbumForm, AlbumFormAdd, AlbumFormDelete, AlbumFormEdit, AlbumFormRemove, PlaylistForm,PlaylistFormAdd, PlaylistFormDelete, PlaylistFormEdit, PlaylistFormRemove } from './inputForms';

const TopBar = () => {
  const username = "Username"; // Replace with dynamic username if needed
  const userImage = purple_image; // Replace with actual user image URL

  return (
    <div className="top-bar">
      <div className="user-infos">
        <img src={userImage} alt={username} className="user-images" />
        <span className="username">{username}</span>
      </div>
      <div className="top-bar-buttons">
        <button className="settings-button" onClick={() => window.location.href = '/settings'}>Settings</button>
        <button className="main-menu-button" onClick={() => window.location.href = '/'}>Main Menu</button>
      </div>
      <div className="project-name">
        <img src={userImage} alt={username} className="project-image" />
        <h1>Coog Music</h1>
      </div>
    </div>
  );
};

// SideBar Component
const SideBar = ({ onButtonClick }) => {
  return (
    <div className="side-bar">
      <button className="side-bar-button" onClick={() => onButtonClick('song-list')}>Song List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('artist-list')}>Artist List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('album-list')}>Album List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('user-lists')}>User List</button>
      <button className="side-bar-button" onClick={() => onButtonClick('profile')}>Profile</button>
      <button className="side-bar-button" onClick={() => onButtonClick('artist-profile')}>Artist Profile</button>
      <button className="side-bar-button" onClick={() => onButtonClick('top-trending')}>Top Trending</button>
      <button className="side-bar-button" onClick={() => onButtonClick('cougar-wrap-up')}>Cougar Wrap-Up</button>
    </div>
  );
};

// BottomBar Component
const BottomBar = ({ currentSong }) => {
  return (
    <div className="bottom-bar">
      <div className="now-playing">
        {currentSong && (
          <>
            <img src={currentSong.photo} alt={currentSong.name} className="song-photo" />
            <span className="current-song-name">{currentSong.name}</span>
          </>
        )}
      </div>
    </div>
  );
};


const Home = () => {
  const [currentSong, setCurrentSong] = useState({
    name: 'Sample Song',
    photo: purple_image,
  });

  const [activeScreen, setActiveScreen] = useState('song-list'); // Default to Song List

  // Function to handle artist click
  const handleArtistClick = (screen) => {
    setActiveScreen(screen);
  };

  const handleAlbumClick = (screen) => {
    setActiveScreen(screen);
  };

  const handlePlaylistClick = (screen) => {
    setActiveScreen(screen);
  };

  return (
    <div className="Home">
      <TopBar />
      <div className="content">
        <SideBar onButtonClick={setActiveScreen} />
        <div className="main-content">
          {renderScreen(activeScreen, handleArtistClick, handleAlbumClick, handlePlaylistClick)}
        </div>
      </div>
      <BottomBar currentSong={currentSong} />
    </div>
  );
};

// Separate function for rendering screens
const renderScreen = (activeScreen, onArtistClick, onAlbumClick, onPlaylistClick) => {
  switch (activeScreen) {
    case 'song-list': return <SongList />;
    case 'artist-list': return <ArtistList onArtistClick={onArtistClick} />;
    case 'album-list': return <AlbumList onAlbumClick={onAlbumClick} />;
    case 'profile': return <Profile setActiveScreen={onPlaylistClick} />;
    case 'artist-profile': return <ArtistProfile setActiveScreen={onArtistClick} />;
    case 'top-trending': return <TopTrending />;
    case 'cougar-wrap-up': return <CougarWrapUp />;
    case 'user-lists': return <UserList />;
    case 'artist-view': return <ArtistView />;
    case 'album-view-page': return <AlbumViewPage />;
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