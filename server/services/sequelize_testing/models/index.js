const {DataTypes} = require('sequelize'),
    clc = require('cli-color');

const user = require('./user_account'),
userSession = require('./user_session');

var sequelizeConnection = require('../sequelizeConnection');

((checkIsConnected)= async ()=>{
    try {
        await sequelizeConnection.authenticate();
        console.log(clc.green('[-- Sequelize connection successful --]'));
        return true;
    }
    catch ( e ) {
        console.log(clc.red('[-- Unable to connect to the database: --]'));
        return false
    }
})();


module.exports = {
    user : user(sequelizeConnection,DataTypes),
    userSession : userSession(sequelizeConnection,DataTypes),
};

/* Convert Database to Sequelize Models Autok*/
//https://frensoltech.wordpress.com/2018/11/08/how-to-convert-existing-database-to-sequelize-models-using-sequelize-auto/
