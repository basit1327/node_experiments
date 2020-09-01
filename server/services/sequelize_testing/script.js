const models = require('./models');

function getUserRecords(){
	setTimeout(()=>{
		models.user.findAll({
				where: {
					student_id:12345
				}
			})
			.then(users => {
				console.log('[-- Successfully fetched users record --]',users)
			})
	},2000);
}

function addUserRecord ( userId,name ) {
	setTimeout(()=>{
		models.user.create({
			student_id : userId,
			name : name
		}).then(function(insertedRecord) {
			console.log(insertedRecord.get({plain: true}));
		}).catch((e)=>{
			console.log('Exception',e)
		});
	},2000);
}

// getUserRecords();
// addUserRecord('912312','Test user');

