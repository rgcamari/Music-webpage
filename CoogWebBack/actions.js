const { stringify } = require('qs');
const pool = require('./database.js');
const queries = require('./queries.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            console.error("Error fetching users:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results));
    });
};

const handleSignup = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { accountType, email, username, password, image } = parsedBody;

            if (!accountType || !email || !username || !password) {
                throw new Error('Missing required fields');
            }

            const validAccountTypes = ['user', 'artist'];
            if (!validAccountTypes.includes(accountType)) {
                throw new Error('Invalid account type');
            }

            const [result] = await pool.promise().query(
                `INSERT INTO ?? (email, username, password, image_url, created_at) VALUES (?, ?, ?, ?, NOW())`,
                [accountType, email, username, password, image]
            );
            
            
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ success: true, message: 'Signup Success' }));
                return;

        } catch (err) {
            console.error('Error during signup:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Signup Failed' }));
        }
    });
};

const handleLogin = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { username, password} = parsedBody;

            if (!username || !password) {
                throw new Error('Missing required fields');
            }

            const [user_check] = await pool.promise().query(
                `SELECT user_id, username, image_url FROM user WHERE username = ? AND password = ?`, [username,password]
            );
            console.log('User Check:', user_check);

            if (user_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    userId: user_check[0].user_id, // Correct the access to user_id
                    userName: user_check[0].username,
                    userImage: user_check[0].image_url,
                    accountType: 'user', // Returning the account type
                    message: "User Account"
                }));
                return;
            }

            const [artist_check] = await pool.promise().query(
                `SELECT artist_id, username, image_url FROM artist WHERE username = ? AND password = ?`, [username, password]
            );
            if (artist_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    userId: artist_check[0].artist_id, // Correct the access to user_id
                    userName: artist_check[0].username,
                    userImage: artist_check[0].image_url,
                    accountType: 'artist', // Returning the account type
                    message: "Artist Account"
                }));
                return;
            }

            const [admin_check] = await pool.promise().query(
                `SELECT admin_id, username, image_url FROM admin WHERE username = ? AND password = ?`, [username, password]
            );
            if (admin_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    userId: admin_check[0].admin_id, // Correct the access to user_id
                    userName: admin_check[0].username,
                    userImage: admin_check[0].image_url, 
                    accountType: 'admin', // Returning the account type
                    message: "Admin Account"
                }));
                return;
            }
        }
        catch (err) {
            console.error('Error during signup:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Login Failed' }));
        }
    });

};

const getArtistList = async (req, res) => {
    try {
        const [artists] = await pool.promise().query(`SELECT artist_id, username, image_url FROM artist`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, artists}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch artists' }));
    }
};

const getAlbumList = async (req, res) => {
    try {
        const [albums] = await pool.promise().query(`SELECT album_id, album.name AS album_name, album.image_url AS album_image, artist.username AS artist_username FROM artist, album WHERE album.artist_id = artist.artist_id`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, albums}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
    }
};

const getUserList = async (req, res) => {
    try {
        const [users] = await pool.promise().query(`SELECT user_id, username, image_url FROM user`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, users}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching users:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch users' }));
    }
}

const getSongList = async (req, res) => {
    try {
        const [songs] = await pool.promise().query(`SELECT song_id, name, song.image_url, artist.username AS artist_username FROM artist, song WHERE song.artist_id = artist.artist_id`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, songs}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch songs' }));
    }
};

const getArtistViewInfo = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {

    try {
        const parsedBody = JSON.parse(body);
        const { username} = parsedBody;
        if (!username) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }


        const [followersResult] = await pool.promise().query(`
            SELECT followers FROM artist WHERE artist.username = ?;`, [username]);

        const [streamsResult] = await pool.promise().query(`SELECT COUNT(*) AS streams_count 
            FROM history, song, artist 
            WHERE history.song_id = song.song_id AND song.artist_id = artist.artist_id AND artist.username = ?;`, [username]);

        const [likedSongsResult] = await pool.promise().query(`SELECT COUNT(*) AS liked_songs_count 
            FROM liked_song, song, artist 
            WHERE song.song_id = liked_song.song_id AND song.artist_id = artist.artist_id AND artist.username = ?;`, [username]);

        const [likedAlbumsResult] = await pool.promise().query(`SELECT COUNT(*) AS liked_albums_count 
            FROM liked_album, album, artist 
            WHERE album.album_id = liked_album.album_id AND album.artist_id = artist.artist_id AND artist.username = ?;`, [username]);

            
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, 
            followers: followersResult[0].followers, 
            streams: streamsResult[0].streams_count, 
            likedSongs: likedSongsResult[0].liked_songs_count, 
            likedAlbums: likedAlbumsResult[0].liked_albums_count 
        }));
    }catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch Artist Info' }));
    }
    });
};

const getArtistViewAlbum = async (req, res) => {
    let body = "";
    
    // Listen for incoming data
    req.on('data', chunk => {
        body += chunk.toString(); // Append received chunks
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { username } = parsedBody;

            if (!username) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Username is required' }));
            }

            const [albums] = await pool.promise().query(`
                SELECT album_id, album.name AS album_name, album.image_url AS album_image, artist.username AS artist_username 
                FROM artist, album 
                WHERE album.artist_id = artist.artist_id AND artist.username = ?;`, [username]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, albums }));
        } catch (err) {
            console.error('Error fetching albums:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
        }
    });
};



module.exports = {
    getUsers,
    handleSignup,
    handleLogin,
    getArtistList,
    getAlbumList,
    getUserList,
    getSongList,
    getArtistViewInfo,
    getArtistViewAlbum
};

