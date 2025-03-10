import React, {useState} from 'react';
import './signup.css';


function Signup() {
    const [accountType, setAccountType] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleType = (actionType) => {
        if (actionType === "user") {
          setAccountType("User");
        }
        else if (actionType === "artist") {
          setAccountType("Artist");
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents page reload
        alert(`AccountType: ${accountType}\nEmail: ${email}\n Username: ${username}\nPassword: ${password}`);
        window.location.href = '/home';
    }    

    return (
            <header className="SignUp-Page">
              <div className="SignUp-Text">
                <p className= "SignUp-title"> Sign In</p>
                <p className= "SignUp-description">Please identify the account type you want:</p>
                <form onSubmit={handleSubmit}>
                    <button className="User-Button" onClick={() =>handleType("user")}>User</button>
                    <button className="Artist-Button" onClick={() =>handleType("artist")}>Artist</button>

                    <div className="Input-Type">
                    <label>Email:</label>
                    </div>
                    <input className= "Input-Box"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    />
                    

                    <div className="Input-Type">
                    <label>Username:</label>
                    </div>
                    <input className= "Input-Box"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    />
                    

                    <div className="Input-Type">
                    <label>Password:</label>
                    </div>
                    <input className= "Input-Box"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    />
                    

                    <div>
                    <button className="Input-Button" type="submit">Log In</button>
                    </div>
                    </form>
              </div>
            </header>
        );
};

export default Signup
