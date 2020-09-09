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


/* Defining Pre/Post Hook with Question Schema*/
// https://mongoosejs.com/docs/middleware.html
Questions.pre('findOneAndUpdate', function(next) {
	console.log("Pre Hook updateOne triggered");
	next();
});

Questions.post('findOneAndUpdate', function(doc) {
	console.log("Post Hook updateOne triggered");
});



/* Exporting Schemas */
module.exports = {
	Questions,
	Votes
};

