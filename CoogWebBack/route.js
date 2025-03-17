const {handleSignup} = require('./actions');


function routes(req, res) {
    const URL = req.url;
    const method = req.method;


    if (URL.startsWith('/signup') && method === 'POST') {
        return handleSignup(req, res);
    } 

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route Not Found" }));
};

module.exports = routes;