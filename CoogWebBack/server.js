const http = require('http');
const url = require('url');
const cors = require('cors');

const corsMiddleWare = cors();


const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    corsMiddleWare(req, res, () => {
        const URL_PARSE = url.parse(req.url, true);
        const {pathName} = URL_PARSE;
        const method = req.method;
    })

})