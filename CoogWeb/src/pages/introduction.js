import React from 'react';
import purple_image from './purple_image.png';
import music_notes from './music_notes.png';
import './introduction.css';


function Introduction() {
  const handleClick = (action) => {
    if (action === "signup") {
      window.location.href = "/signup";
    }
    else if (action === "login") {
      window.location.href = "/login";
    }
  };

    return (
        <header className="Start-Page">
          <div className="Intro-Text">
            <p className= "title"> Coog Music</p>
            <p className= "description">Welcome to Coog Music! Where UH students can discover, listen, and share your favorite tunes. Like and follow artists, create personalized playlists, connect with friends, and experience your own Coog Music Wrap-up! Dive into a world of music tailored to you!</p>
            <img src={music_notes} alt="Description of the image" className= "Music-Image" />
            <button className="Sign-Up" onClick={() =>handleClick("signup")}>Sign Up</button>
            <button className="Log-In" onClick={() =>handleClick("login")}>Log In</button>
          </div>
        </header>
    );
}

export default Introduction