const mongoose = require('mongoose'),
	schemas = require('./schema');

/* Exporting Modals */
module.exports = {
	Questions : mongoose.model('Questions', schemas.Questions),
	Votes : mongoose.model('Votes', schemas.Votes),
};
