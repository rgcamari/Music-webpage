const actions = requie('./actions');


function routes(req, res) {
    const URL = req.url;
    const method = req.method;


    if (URL.startsWith('/signup') && method === 'PORT') {
        return handleSignup(req, res);
    } 
};

module.exports = {
    routes
};