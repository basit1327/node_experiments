var {Sequelize,DataTypes} = require('sequelize');
var sequelize = new Sequelize('iukl', 'root', 'root',{
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	define: {
		timestamps: false
	}
});

var connected = false;

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
		connected = true;
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = {
	connected,
	connection:sequelize,
	DataTypes
};
