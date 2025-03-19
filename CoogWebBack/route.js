const actions = require('./actions');


function routes(req, res) {
    const URL = req.url;
    const method = req.method;

    console.log(`Incoming request: ${method} ${URL}`);
    if (URL.startsWith('/signup') && method === 'POST') {
        return actions.handleSignup(req, res);
    } 
    if (URL.startsWith('/login') && method === 'POST') {
        return actions.handleLogin(req, res);
    }
    if (URL.startsWith('/artistlist') && method === 'GET') {
        return actions.getArtistList(req, res);
    }
    if (URL.startsWith('/albumlist') && method === 'GET') {
        return actions.getAlbumList(req, res);
    }
    if (URL.startsWith('/userlist') && method === 'GET') {
        return actions.getUserList(req, res);
    }
    if (URL.startsWith('/songlist') && method === 'GET') {
        return actions.getSongList(req, res);
    }
    if (URL.startsWith('/artistview') && method === 'GET') {
        return actions.getArtistViewInfo(req, res);
    }
    

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route Not Found" }));
};

module.exports = routes;