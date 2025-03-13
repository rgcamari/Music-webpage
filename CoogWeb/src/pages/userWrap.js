import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './userWrap.css';
import {TopArtist, TopSongList, TopAlbum, TopGenre, Other} from './wrap';


export const CougarWrapUp = () => {
    return (
        <section className="wrapUpPage">
        <div className="profile-section">
                <div className="profile-header">
                    <img src={purple_image} alt="Profile" className="profile-image" />
                    <h2 className="profile-username">Username Wrap Up!</h2>
                </div>
        </div>
        <div className="top-artists-section">
                        <div className="top-artists-header">Top 3 Artists of the Week! 
                        </div>
                        <TopArtist />
                    </div>
            
                    <div className="top-songs-section">
                        <div className="top-songs-header">Top 10 Songs of the Week! 
                        </div>
                        <TopSongList />
                    </div>
            
                    <div className="top-albums-section">
                        <div className="top-albums-header">Top 3 Albums of the Week! 
                        </div>
                        <TopAlbum />
                    </div>
            
                    <div className="top-genres-section">
                        <div className="top-genres-header">Top 3 Genres of the Week! 
                        </div>
                        <TopGenre />
                    </div>
            
                    <div className="Other-Sections">
                        <div className = "other-header"> Miscellaneous Information
                        </div>
                        <Other />
                    </div>
        </section>
    );
}