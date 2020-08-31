const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/* Defining Schemas */
const User = new Schema({
	name: { type: String, default: 'user' },
	age: { type: Number, min: 18, index: true },
	date: { type: Date, default: Date.now }
});


/* Exporting Schemas */
module.exports = {
	User,
};

