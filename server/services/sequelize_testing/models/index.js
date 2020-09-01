const user = require('./user_account'),
userSession = require('./user_session');

var {connection,DataTypes,connected} = require('../connection');

module.exports = {
    isConnected:connected,
    user : user(connection,DataTypes),
    userSession : userSession(connection,DataTypes),
};


/* Convert Database to Sequelize Models Autok*/
//https://frensoltech.wordpress.com/2018/11/08/how-to-convert-existing-database-to-sequelize-models-using-sequelize-auto/
