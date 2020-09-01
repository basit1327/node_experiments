"use strict";
var Sequelize = require('sequelize');
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

module.exports = sequelize;
