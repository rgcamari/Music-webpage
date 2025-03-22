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
    if (URL.startsWith('/artistview') && method === 'POST') {
        return actions.getArtistViewInfo(req, res);
    }
    if (URL.startsWith('/artistalbum') && method === 'POST') {
        return actions.getArtistViewAlbum(req, res);
    }
    if (URL.startsWith('/artistsong') && method === 'POST') {
        return actions.getArtistViewSong(req, res);
    }
    if (URL.startsWith('/albumview') && method === 'POST') {
        return actions.getAlbumViewInfo(req, res);
    }
    if (URL.startsWith('/albumsong') && method === 'POST') {
        return actions.getAlbumViewSong(req, res);
    }
    if (URL.startsWith('/topsongs') && method === 'GET') {
        return actions.getTopSongs(req, res);
    }
    if (URL.startsWith('/topartists') && method === 'GET') {
        return actions.getTopArtists(req, res);
    }
    if (URL.startsWith('/topalbums') && method === 'GET') {
        return actions.getTopAlbums(req, res);
    }
    if (URL.startsWith('/topgenres') && method === 'GET') {
        return actions.getTopGenres(req, res);
    }
    if (URL.startsWith('/topother') && method === 'GET') {
        return actions.getTopOther(req, res);
    }
    if (URL.startsWith('/artistprofileinfo') && method === 'POST') {
        return actions.getArtistInfo(req, res);
    }
    if (URL.startsWith('/artistprofilealbum') && method === 'POST') {
        return actions.getArtistProfileAlbum(req, res);
    }
    if (URL.startsWith('/createsong') && method === 'POST') {
        return actions.createSong(req, res);
    }
    if (URL.startsWith('/editsong') && method === 'POST') {
        return actions.editSong(req, res);
    }
    if (URL.startsWith('/deletesong') && method === 'POST') {
        return actions.deleteSong(req, res);
    }
    if (URL.startsWith('/addalbum') && method === 'POST') {
        return actions.createAlbum(req, res);
    }
    

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Route Not Found" }));
};

module.exports = routes;