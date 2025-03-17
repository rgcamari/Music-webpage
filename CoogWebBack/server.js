const http = require('http');
const { loginUser } = require('./login');
const url = require('url');
const cors = require('cors');

const corsMiddleWare = cors();

const map_route = {
    'GET': [
    ],
    'POST': [
    ],
    'PUT': [
    ],
    'DELETE': [
    ],
};


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

        if (pathName === "/") {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify("Backend"));
            return;
        }

        const isMatch = (map_route[method] || []).some(route => pathName.startswith(route));

        if (isMatch === true) {
            return eRoutes(req,res);
        }

        res.writeHead(404, {"Content-Type": "application/json"});
        res.end(JSON.stringify({error: "Route Not Found"}));
    });
});

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
})