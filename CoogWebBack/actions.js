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



module.exports = {
    getUsers
};