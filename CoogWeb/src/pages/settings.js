import React, {useState} from 'react';
import purple_image from './purple_image.png';
import './settings.css';

export const SettingsPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSaveChanges = () => {
        // Logic to save changes
        console.log('Changes saved:', { username, password, email });
    };

    const handleDeleteAccount = () => {
        // Logic to delete account
        console.log('Account deleted');
    };

    return (
        <div className="settings-page">
            <h1 className="settings-header">Settings</h1>

            <div className="settings-section">
                <h2 className="settings-section-title">Change Username</h2>
                <input
                    type="text"
                    placeholder="New Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="settings-input"
                />
            </div>

            <div className="settings-section">
                <h2 className="settings-section-title">Change Password</h2>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="settings-input"
                />
            </div>

            <div className="settings-section">
                <h2 className="settings-section-title">Change Email</h2>
                <input
                    type="email"
                    placeholder="New Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="settings-input"
                />
            </div>

            <button className="save-changes-button" onClick={handleSaveChanges}>
                Save Changes
            </button>

            <button className="delete-account-button" onClick={handleDeleteAccount}>
                Delete Account
            </button>
        </div>
    );
};

function Settings () {

    return (
        <header className="Setting-Page">
            <SettingsPage />
        </header>
    );
};

export default Settings;