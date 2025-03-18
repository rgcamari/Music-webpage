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
                `INSERT INTO ?? (email, username, password, image_url) VALUES (?, ?, ?, ?)`,
                [accountType, email, username, password, image]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, userId: result.insertId }));
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
                `SELECT user_id FROM user WHERE username = ? AND password = ?`, [username,password]
            );
            if (user_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    userId: user_check[0].user_id, // Correct the access to user_id
                    accountType: 'user', // Returning the account type
                    message: "User Account"
                }));
                return;
            }

            const [artist_check] = await pool.promise().query(
                `SELECT artist_id FROM artist WHERE username = ? AND password = ?`, [username, password]
            );
            if (artist_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    artistId: artist_check[0].artist_id, // Correct the access to user_id
                    accountType: 'artist', // Returning the account type
                    message: "Artist Account"
                }));
                return;
            }

            const [admin_check] = await pool.promise().query(
                `SELECT album_id FROM album WHERE username = ? AND password = ?`, [username, password]
            );
            if (admin_check.length > 0) {
                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify({
                    success: true,
                    adminId: admin_check[0].admin_id, // Correct the access to user_id
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




module.exports = {
    getUsers,
    handleSignup,
    handleLogin
};

/*const handleLogin = async (req, res) => {
    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        console.log("Received body:", body);

        res.writeHead(200, { "Content-Type": "application/json" }); // ✅ Fix headers
        res.end(JSON.stringify({ success: true, message: "Request received" }));
    });
};*/