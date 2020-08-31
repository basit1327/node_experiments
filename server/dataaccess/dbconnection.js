"use strict";
const _ = require('lodash'),
    clc = require('cli-color');

var pool = require('./connectionpool');

class DbConnection {

    async getConnection() {
        try{
            let connection = await pool.getConnection();
            connection.releaseTimeout = setTimeout(()=>{
                try{
                    if ( _.has(connection,'connection.isReleased') ) {
                        if ( !connection.connection.isReleased ){
                            connection.rollback();
                            connection.release();
                            console.log(clc.red("Connection Forcefully Released dbconnection.js->getConnection!!!"));

                        }
                    }
                }
                catch (e) {
                   console.log(e);
                }
                /* Timeout of 5 sec, if connection not release till 5 sec, it will force terminate the connection */
            },5000);
            return Promise.resolve(connection);
        }
        catch (e) {
            console.log(e);
            return Promise.reject(undefined);
        }

    }

    commit(callBack) {
        this.connection.commit(callBack);
    }

    rollback(callBack) {
        this.connection.rollback(callBack);
    }

    constructor(dbConfig) {

    }
}

module.exports = {
    DbConnection
};
