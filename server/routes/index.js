'use strict';

const apiRoute = require('./api');

function init(server) {

    server.use('/', function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Authorization");
        next();
    });

    server.get('/', function (req, res) {
        res.render('index', { greeting: 'Welcome' });
    });

    server.use('/api',apiRoute);

}

module.exports = {
    init: init
};
