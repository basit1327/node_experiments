'use strict';

module.exports = {
    environment: "LOCAL",
    hostname: 'localhost',
    viewDir: './app/views',
    publicDir :'./app/public',
    serverPort : 3000,
    redisServerConfig:{
        user: "",
        password: "",
        host: "",
        port: 6379
    }
};
