const { stringify } = require('qs');
const pool = require('./database.js');
const queries = require('./queries.js');
const nodemailer = require('nodemailer');

const getUsers = (req,res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            console.error("Error fetching Users:", error);
            response.writeHead(500, {"Content-Type": "application/json"});
            response.end(JSON.stringify({error: "Internal server error"}));
            return;
        }
        response.writeHead(200, {"Content-Type": "application/json"});
        response.end(JSON.stringify(results));
    });
};

const handleSignup = async (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chink.toString();
    });

    req.on('end', async () => {
        try {
            const {accountType, email, username, password,image} = JSON.parse(body);
            const hashedPassword = await bcrypt.hash(password, 10);
            
            let tableName;
            if (accountType === 'user') {
                tableName = 'user';
            }
            else if (accountType === 'artist') {
                tableName = 'artist';
            }
            else {throw new Error('Invalid account type');}

            const [result] = await pool.promise().query(`INSERT INTO ${tableName} (email, username, password, image_url) values (?,?,?,?)`,
                [email, username, hashedPassword, image]
            );
            res.writeHead(201, {"Content-Type": 'application/json'});
            res.end(JSON.stringify({success: true}));
        }
        catch (err) {
            console.error('Error during sigup:', err);
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({success: false, message: 'Signup Failed'}));
        }
    });
};


module.exports = {
    getUsers,
    handleSignup
};