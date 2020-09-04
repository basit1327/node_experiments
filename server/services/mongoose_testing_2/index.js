const mongoose = require('mongoose'),
	clc = require('cli-color'),
	_ = require('lodash'),
	models = require('./models');

async function connectMongo(){
	let mongooseConn = await mongoose.connect('mongodb://localhost/vpoll', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

	if (mongooseConn.connection){
		console.log(clc.green('[--Mongoose connection successful--]'));
		// InsertRecords();
		// getRecord()
		// addNewVote()
	} else {
		console.log(clc.red('Mongoose connection was unsuccessful'));
	}
}

async function InsertRecords (){
	// Insert Record
	const instance = new models.Questions();
	instance.text = 'Is bitcoin worth the time and money that mining requires?';
	instance.date = new Date('2020-09-03');
	instance.save(function (err,success) {
		if(err){
			console.log(clc.red(err));
		}
		else {
			console.log(clc.green('[-- New Record Inserted --]'));
		}
	});
}

async function getRecord (){
	models.User.find({}, function (err, docs) {
		if(err){
			console.log(clc.red(err));
		}
		else {
			console.log(docs);
		}
	});
}

async function addNewVote (){

	let new_vote = {
		vote_value: 1,
		casted_at: new Date()
	};

	models.Questions.findOneAndUpdate(
		{ id: "5f51f20c4d1e1b05f08bd9e1" },
		{ $push: {votes:new_vote} },
		function (error, success) {
			if (error) {
				console.log(error);
			} else {
				console.log(success);
			}
		})
}


connectMongo();
