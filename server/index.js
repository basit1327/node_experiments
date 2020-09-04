'use strict';
/**
 * Dependencies of This Application
 */
const
    express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes');

let server = express(),
    create,
    start
    ;

create = function (config) {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.serverPort);
    server.set('hostname', config.hostname);
    server.set('viewDir', config.viewDir);

    // Returns middleware that parses json
    server.use(bodyParser.json());

    // setup public directory
    server.use(express.static(config.publicDir));

    // Setup view engine
    server.set('views', server.get('viewDir'));
    server.set('view engine', '.ejs');

    // Set up routes
    routes.init(server);
};

start = function () {
    let hostname = server.get('hostname'),
        port = server.get('port');

    server.listen(port, function () {
        console.log(`Starting the Http instance of RNS Server at: ${hostname} : ${port}`);
        console.log("Http instance of RNS Server is Live!!!");
    });
};

module.exports ={
    create,
    start
};
