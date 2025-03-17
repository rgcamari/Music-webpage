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

            const hashedPassword = await bcrypt.hash(password, 10);

            const [result] = await pool.promise().query(
                `INSERT INTO ?? (email, username, password, image_url) VALUES (?, ?, ?, ?)`,
                [accountType, email, username, hashedPassword, image]
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

module.exports = {
    getUsers,
    handleSignup
};
