import React, {useState} from 'react';
import purple_image from './purple_image.png';
import music_notes from './music_notes.png';
import './login.css';

function Login () {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page reload
        alert(`AccountType: ${username}\nPassword: ${password}`);
        window.location.href = '/home';
    }

    return (
        <header className="LogIn-Page">
          <div className="LogIn-Text">
            <p className= "LogIn-title"> Log In</p>
            <p className= "LogIn-description">Please enter your Username and Password:</p>
            <form onSubmit={handleSubmit}>

                <div className="LogIn-Type">
                <label>Username:</label>
                </div>
                <input className= "LogIn-Box"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
                

                <div className="LogIn-Type">
                <label>Password:</label>
                </div>
                <input className= "LogIn-Box"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                />
                

                <div>
                <button className="LogIn-Button" type="submit">Log In</button>
                </div>
                </form>
          </div>
        </header>
    );
};

export default Login;