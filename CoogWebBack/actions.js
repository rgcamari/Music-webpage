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

const getArtistViewSong = async (req, res) => {
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

            const [songs] = await pool.promise().query(`
                SELECT song_id, song.name AS song_name, song.image_url AS song_image, album.name AS album_name 
                FROM artist, song, album 
                WHERE song.artist_id = artist.artist_id AND album.album_id = song.song_id AND artist.username = ?;`, [username]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, songs }));
        } catch (err) {
            console.error('Error fetching albums:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
        }
    });
};

const getAlbumViewSong = async (req, res) => {
    let body = "";
    
    // Listen for incoming data
    req.on('data', chunk => {
        body += chunk.toString(); // Append received chunks
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { album_name } = parsedBody;

            if (!album_name) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Username is required' }));
            }

            const [songList] = await pool.promise().query(`
                SELECT song_id, song.name AS song_name, song.image_url AS song_image, album.name AS album_name 
                FROM song, album 
                WHERE album.album_id = song.song_id AND album.name = ?;`, [album_name]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, songList }));
        } catch (err) {
            console.error('Error fetching songs:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Failed to fetch songs' }));
        }
    });
};

const getAlbumViewInfo = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {

    try {
        const parsedBody = JSON.parse(body);
        const { album_name} = parsedBody;
        if (!album_name) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }


        const [songsResult] = await pool.promise().query(`
            SELECT count(*) AS songCount FROM album, song WHERE album.album_id = song.album_id AND album.name = ?;`, [album_name]);

        const [streamsResult] = await pool.promise().query(`SELECT COUNT(*) AS streams_count 
            FROM history, song, album 
            WHERE history.song_id = song.song_id AND song.album_id = album.album_id AND album.name = ?;`, [album_name]);

        const [likedAlbumsResult] = await pool.promise().query(`SELECT likes FROM album WHERE album.name = ?;`, [album_name]);

        const songCount = songsResult.length > 0 ? songsResult[0].songCount : 0;
        const streams = streamsResult.length > 0 ? streamsResult[0].streams_count : 0;
        const likes = likedAlbumsResult.length > 0 ? likedAlbumsResult[0].likes : 0;
            
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, 
            songCount,
            streams,
            likes
        }));
    }catch (err) {
        console.error('Error fetching songs:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch songs' }));
    }
    });
};

const getTopSongs = async (req, res) => {
    try {
        const [songs] = await pool.promise().query(`SELECT 
        ROW_NUMBER() OVER (ORDER BY song.play_count DESC) AS ranks,
        song.song_id,
        song.name,
        song.image_url,
        artist.artist_id AS artist_name,
        play_count
        FROM song
        JOIN artist ON song.artist_id = artist.artist_id
        ORDER BY play_count DESC
        LIMIT 10;`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, songs}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch songs' }));
    }
};

const getTopArtists = async (req, res) => {
    try {
        const [topArtists] = await pool.promise().query(`SELECT 
        ROW_NUMBER() OVER (ORDER BY SUM(song.play_count) DESC) AS ranks,
        artist.artist_id,
        artist.username,
        artist.image_url,
        SUM(song.play_count) AS total_streams
        FROM artist
        JOIN song ON artist.artist_id = song.artist_id
        GROUP BY artist.artist_id, artist.username
        ORDER BY total_streams DESC
        LIMIT 3;`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, topArtists}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch artists' }));
    }
};

const getTopAlbums = async (req, res) => {
    try {
        const [topAlbums] = await pool.promise().query(`SELECT 
        ROW_NUMBER() OVER (ORDER BY SUM(song.play_count) DESC) AS ranks,
        album.album_id,
        album.name,
        album.image_url,
        artist.username AS artist_name,
        SUM(song.play_count) AS total_streams
        FROM album
        JOIN song ON album.album_id = song.album_id
        JOIN artist ON album.artist_id = artist.artist_id
        GROUP BY album.album_id, album.name, album.image_url
        ORDER BY total_streams DESC
        LIMIT 3;`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, topAlbums}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
    }
};

const getTopGenres = async (req, res) => {
    try {
        const [topGenres] = await pool.promise().query(`SELECT 
        genre AS genre_name,
        SUM(play_count) AS total_streams
        FROM song
        GROUP BY genre
        ORDER BY total_streams DESC
        LIMIT 3;`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, topGenres}));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
    }
};

const getTopOther = async (req, res) => {
    try {
        const [streamCount] = await pool.promise().query(`SELECT SUM(song.play_count) FROM song;`);
        const [userCount] = await pool.promise().query(`SELECT COUNT(*) FROM user;`);
        const [artistCount] = await pool.promise().query(`SELECT COUNT(*) FROM artist;`);
        const [albumCount] = await pool.promise().query(`SELECT COUNT(*) FROM album;`);
        const [genreCount] = await pool.promise().query(`SELECT COUNT(DISTINCT genre) FROM song;`);
        const [playlistCount] = await pool.promise().query(`SELECT COUNT(*) FROM playlist;`);
        const [likeCount] = await pool.promise().query(`SELECT 
        (SELECT SUM(likes) FROM album) + 
        (SELECT SUM(likes) FROM song) AS counter;`);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, topOthers:{
            streamCount: streamCount[0]['SUM(song.play_count)'],  // Access the count
            userCount: userCount[0]['COUNT(*)'],
            artistCount: artistCount[0]['COUNT(*)'],
            albumCount: albumCount[0]['COUNT(*)'],
            genreCount: genreCount[0]['COUNT(DISTINCT genre)'],
            playlistCount: playlistCount[0]['COUNT(*)'],
            likeCount: likeCount[0].counter}
        }));  // Ensure response is sent
    } catch (err) {
        console.error('Error fetching artists:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
    }
};

const getArtistInfo = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {

    try {
        const parsedBody = JSON.parse(body);
        const { userName} = parsedBody;
        if (!userName) {
            return res.status(400).json({ success: false, message: 'Username is required' });
        }


        const [followersResult] = await pool.promise().query(`
            SELECT followers FROM artist WHERE artist.username = ?;`, [userName]);

        const [streamsResult] = await pool.promise().query(`SELECT COUNT(*) AS streams_count 
            FROM history, song, artist 
            WHERE history.song_id = song.song_id AND song.artist_id = artist.artist_id AND artist.username = ?;`, [userName]);

        const [likedSongsResult] = await pool.promise().query(`SELECT COUNT(*) AS liked_songs_count 
            FROM liked_song, song, artist 
            WHERE song.song_id = liked_song.song_id AND song.artist_id = artist.artist_id AND artist.username = ?;`, [userName]);

        const [likedAlbumsResult] = await pool.promise().query(`SELECT COUNT(*) AS liked_albums_count 
            FROM liked_album, album, artist 
            WHERE album.album_id = liked_album.album_id AND album.artist_id = artist.artist_id AND artist.username = ?;`, [userName]);

            
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

const getArtistProfileAlbum = async (req, res) => {
    let body = "";
    
    // Listen for incoming data
    req.on('data', chunk => {
        body += chunk.toString(); // Append received chunks
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { userName } = parsedBody;

            if (!userName) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Username is required' }));
            }

            const [albums] = await pool.promise().query(`
                SELECT album_id, album.name AS album_name, album.image_url AS album_image, artist.username AS artist_username 
                FROM artist, album 
                WHERE album.artist_id = artist.artist_id AND artist.username = ?;`, [userName]);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, albums }));
        } catch (err) {
            console.error('Error fetching albums:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: 'Failed to fetch albums' }));
        }
    });
};

const createSong = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { name, artist, genre, album, image, URL } = parsedBody;

            // Validate required fields
            if (!name || !artist || !genre || !album || !image || !URL) {
                throw new Error('Missing required fields');
            }

            // Check if the album exists and belongs to the artist
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id, artist_id FROM album WHERE name = ?",
                [album]
            );

            if (albumExists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album does not exist' }));
            }

            const album_id = albumExists[0].album_id;
            const album_artist_id = albumExists[0].artist_id;


            // Ensure the artist adding the song is the album's owner
            if (album_artist_id !== Number(artist)) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'album does not exist' }));
            }

            // Insert the song
            await pool.promise().query(
                `INSERT INTO song (name, artist_id, album_id, genre, image_url, play_count, likes,length, song_url, created_at)
                 VALUES (?, ?, ?, ?, ?, 0, 0,0, ?, NOW())`,
                [name, artist, album_id, genre, image, URL]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Song added successfully' }));
        } catch (err) {
            console.error('Error adding song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to add song' }));
        }
    });
};

const editSong = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            let { prevName, name, artist, genre, image } = parsedBody;

            // Validate if at least one field is provided
            if (!name && !artist && !genre && !image) {
                throw new Error('Missing required fields to update');
            }

            // Check if the song exists with the previous name
            const [songExists] = await pool.promise().execute(
                "SELECT song_id FROM song WHERE name = ?",
                [prevName]
            );

            if (songExists.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song not found' }));
            }

            // Check for duplicates with the new name (within the same artist)
            if (name) {
                const [duplicateSong] = await pool.promise().execute(
                    "SELECT song_id FROM song WHERE name = ? AND artist_id = (SELECT artist_id FROM song WHERE name = ?)",
                    [name, prevName]
                );

                if (duplicateSong.length > 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: false, message: 'Duplicate song name for this artist' }));
                }
            }

            // Handle undefined fields: if a field is undefined, convert to null
            name = name || null;
            artist = artist || null;
            genre = genre || null;
            image = image || null;

            // Update the song with new data (only the fields that are provided)
            await pool.promise().query(
                `UPDATE song 
                SET 
                    name = COALESCE(?, name),
                    artist_id = COALESCE(?, artist_id),
                    genre = COALESCE(?, genre),
                    image_url = COALESCE(?, image_url)
                WHERE name = ?`,
                [name, artist, genre, image, prevName]
            );

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Song edited successfully' }));
        } catch (err) {
            console.error('Error editing song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to edit song' }));
        }
    });
};

const deleteSong = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { name, artist } = parsedBody;

            // Validate required fields
            if (!name || !artist) {
                throw new Error('Missing required fields to delete');
            }

            // Check if the song exists for the given artist
            const [songExists] = await pool.promise().execute(
                "SELECT song_id FROM song WHERE name = ? AND artist_id = ?",
                [name, artist]
            );

            if (songExists.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song not found' }));
            }

            // Delete the song
            await pool.promise().execute(
                "DELETE FROM song WHERE song_id = ?",
                [songExists[0].song_id]
            );

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Song deleted successfully' }));
        } catch (err) {
            console.error('Error deleting song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to delete song' }));
        }
    });
};

const createAlbum = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { name, artist, genre, image} = parsedBody;

            // Validate required fields
            if (!name || !artist || !genre ||!image) {
                throw new Error('Missing required fields');
            }

            // Check if the album exists and belongs to the artist
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id, artist_id FROM album WHERE name = ?",
                [name]
            );

            if (albumExists.length !== 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album already exist' }));
            }

            // Insert the song
            await pool.promise().query(
                `INSERT INTO album (name, artist_id, genre, image_url,likes,created_at)
                 VALUES (?, ?, ?, ?, 0, NOW())`,
                [name, artist, genre, image]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Album added successfully' }));
        } catch (err) {
            console.error('Error adding song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to add album' }));
        }
    });
};

const editAlbum = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            let { prevName, name, artist, genre, image } = parsedBody;

            // Validate if at least one field is provided
            if (!name && !artist && !genre && !image) {
                throw new Error('Missing required fields to update');
            }

            // Check if the song exists with the previous name
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id FROM album WHERE name = ?",
                [prevName]
            );

            if (albumExists.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album not found' }));
            }

            // Check for duplicates with the new name (within the same artist)
            if (name) {
                const [duplicateAlbum] = await pool.promise().execute(
                    "SELECT album_id FROM album WHERE name = ? AND artist_id = (SELECT artist_id FROM album WHERE name = ?)",
                    [name, prevName]
                );

                if (duplicateAlbum.length > 0) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify({ success: false, message: 'Duplicate album name for this artist' }));
                }
            }

            // Handle undefined fields: if a field is undefined, convert to null
            name = name || null;
            artist = artist || null;
            genre = genre || null;
            image = image || null;

            // Update the song with new data (only the fields that are provided)
            await pool.promise().query(
                `UPDATE album 
                SET 
                    name = COALESCE(?, name),
                    artist_id = COALESCE(?, artist_id),
                    genre = COALESCE(?, genre),
                    image_url = COALESCE(?, image_url)
                WHERE name = ?`,
                [name, artist, genre, image, prevName]
            );

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Album edited successfully' }));
        } catch (err) {
            console.error('Error editing song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to edit album' }));
        }
    });
};

const deleteAlbum = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { name, artist } = parsedBody;

            // Validate required fields
            if (!name || !artist) {
                throw new Error('Missing required fields to delete');
            }

            // Check if the song exists for the given artist
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id FROM album WHERE name = ? AND artist_id = ?",
                [name, artist]
            );

            if (albumExists.length === 0) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album not found' }));
            }

            // Delete the song
            await pool.promise().execute(
                "DELETE FROM album WHERE album_id = ?",
                [albumExists[0].album_id]
            );

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Album deleted successfully' }));
        } catch (err) {
            console.error('Error deleting song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to delete album' }));
        }
    });
};

const addAlbumSong = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            console.log('Parsed Body:', parsedBody);
            const { name, artist, song_name } = parsedBody;

            // Validate required fields
            if (!name || !artist || !song_name) {
                throw new Error('Missing required fields');
            }

            // Check if the album exists and belongs to the artist
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id FROM album WHERE name = ? AND artist_id = ?",
                [name, artist]
            );

            if (albumExists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album does not exist or does not belong to the artist' }));
            }

            const albumId = albumExists[0].album_id;

            // Check if the song exists
            const [songExists] = await pool.promise().execute(
                "SELECT song_id, album_id FROM song WHERE name = ? AND artist_id = ?",
                [song_name, artist]
            );

            if (songExists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song does not exist' }));
            }

            const songId = songExists[0].song_id;
            const currentAlbumId = songExists[0].album_id;

            // Prevent reassigning if the song is already in the album
            if (currentAlbumId === albumId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song is already in this album' }));
            }

            // Assign the song to the album
            await pool.promise().execute(
                `UPDATE song
                SET album_id = ?
                WHERE song_id = ?`,
                [albumId, songId]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Song added to album successfully' }));
        } catch (err) {
            console.error('Error adding song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to add song' }));
        }
    });
};

const removeAlbumSong = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            console.log('Parsed Body:', parsedBody);
            const { name, artist, song_name } = parsedBody;

            // Validate required fields
            if (!name || !artist || !song_name) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
            }

            // Check if the album exists and belongs to the artist
            const [albumExists] = await pool.promise().execute(
                "SELECT album_id FROM album WHERE name = ? AND artist_id = ?",
                [name, artist]
            );

            if (albumExists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Album does not exist or does not belong to the artist' }));
            }

            const albumId = albumExists[0].album_id;

            // Check if the song exists
            const [songExists] = await pool.promise().execute(
                "SELECT song_id, album_id FROM song WHERE name = ? AND artist_id = ?",
                [song_name, artist]
            );

            if (songExists.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song does not exist' }));
            }

            const songId = songExists[0].song_id;
            const currentAlbumId = songExists[0].album_id;

            // Prevent reassigning if the song is already in the album
            if (currentAlbumId !== albumId) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: false, message: 'Song is not in this album' }));
            }

            // Assign the song to the album
            await pool.promise().execute(
                `UPDATE song
                SET album_id = NULL
                WHERE song_id = ?`,
                [songId]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, message: 'Song removed from album successfully' }));
        } catch (err) {
            console.error('Error removing song:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, message: err.message || 'Failed to remove song' }));
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
    getArtistViewAlbum,
    getArtistViewSong,
    getAlbumViewSong,
    getAlbumViewInfo,
    getTopSongs,
    getTopArtists,
    getTopAlbums,
    getTopGenres,
    getTopOther,
    getArtistInfo,
    getArtistProfileAlbum,
    createSong,
    editSong,
    deleteSong,
    createAlbum,
    editAlbum,
    deleteAlbum,
    addAlbumSong,
    removeAlbumSong
};

