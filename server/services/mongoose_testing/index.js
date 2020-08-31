const mongoose = require('mongoose'),
	clc = require('cli-color'),
	_ = require('lodash'),
	models = require('./models');

async function connectMongo(){
	let mongooseConn = await mongoose.connect('mongodb://localhost/rns_mongodb', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

	if (mongooseConn.connection){
		console.log(clc.green('[--Mongoose connection successful--]'));
		// InsertRecords();
		// getRecord()
	} else {
		console.log(clc.red('Mongoose connection was unsuccessful'));
	}
}

async function InsertRecords (){
	// Insert Record
	const instance = new models.User();
	instance.name = 'T1';
	instance.age = 26;
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

connectMongo();
