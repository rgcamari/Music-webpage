import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './home.css';

// TopBar Component
const TopBar = () => {
    const username = "Username"; // Replace with dynamic username if needed
    const userImage = purple_image; // Replace with actual user image URL
  
    return (
      <div className="top-bar">
        <div className="user-info">
          <img src={userImage} alt={username} className="user-image" />
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
  const SideBar = () => {
    const navigateTo = (path) => {
      window.location.href = path; // Navigate to the specified path
    };
  
    return (
      <div className="side-bar">
        <button className="side-bar-button" onClick={() => navigateTo('/songs')}>Song List</button>
        <button className="side-bar-button" onClick={() => navigateTo('/artists')}>Artist List</button>
        <button className="side-bar-button" onClick={() => navigateTo('/albums')}>Album List</button>
        <button className="side-bar-button" onClick={() => navigateTo('/profile')}>Profile</button>
        <button className="side-bar-button" onClick={() => navigateTo('/top-trending')}>Top Trending</button>
        <button className="side-bar-button" onClick={() => navigateTo('/cougar-wrap-up')}>Cougar Wrap-Up</button>
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
              <span className="song-name">{currentSong.name}</span>
            </>
          )}
        </div>
      </div>
    );
  };
  
  // Main App Component
  const Home = () => {
    const [currentSong, setCurrentSong] = useState({
      name: 'Sample Song',
      photo: purple_image,
    });
  
    return (
      <div className="Home">
        <TopBar />
        <div className="content">
          <SideBar />
          <div className="main-content">
            {/* Main content goes here */}
          </div>
        </div>
        <BottomBar currentSong={currentSong} />
      </div>
    );
  };

export default Home;