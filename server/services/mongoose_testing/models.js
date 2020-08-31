const mongoose = require('mongoose'),
	schemas = require('./schema');

/* Exporting Modals */
module.exports = {
	User : mongoose.model('User', schemas.User),
};
