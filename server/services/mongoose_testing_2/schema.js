const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/* Defining Schemas */

const Votes = new Schema({
	vote_value: { type: String },
	casted_at: { type: Date, default: Date.now }
});

const Questions = new Schema({
	id: { type: String, default: mongoose.Types.ObjectId(), index: true },
	text: { type: String },
	date: { type: Date, default: Date.now },
	votes: {type: [Votes]}
});



/* Exporting Schemas */
module.exports = {
	Questions,
	Votes
};

