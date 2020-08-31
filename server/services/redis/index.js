'use strict';

const redis = require('redis'),
	clc = require('cli-color'),
	config = require('../../../configs'),
	redisConnectionString = 'redis://' + config.redisServerConfig.user + ':' + config.redisServerConfig.password + '@' + config.redisServerConfig.host + ':' + config.redisServerConfig.port;
var redisClient =  redis.createClient(redisConnectionString),
	isConnected = false;

const channelId = 'rns_orders';

redisClient.on("ready", ()=> {
	isConnected = true;
	console.log(clc.green('======= connected to redis server ======='));
});

redisClient.on("reconnecting", ()=> {
	isConnected = false;
	console.log(clc.red('== reconnecting to redis server =='));
});

redisClient.on("error", function (e) {
	isConnected = false;
	console.log(clc.red('== Could not connect to redis server =='));
	console.log(clc.red(e));
});


async function copyAllRecordToRedis (data) {
	try{
		redisClient.set("rns_orders",JSON.stringify(data));
		redisClient.save();
		return true;
	}
	catch (e) {
		console.log(e);
		return new Error('something went wrong while adding key to redis')
	}
}

async function appendRecordToRedis (object) {
	try{
		let data = await getAllOrders();
		if ( !data){
			data = [];
		}
		else {
			data.push(object)
		}

		redisClient.set("rns_orders",JSON.stringify(data));
		redisClient.save();
		return true;
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting orders from redis'});
		console.log(clc.red(e));
	}
}

async function deleteSingleRecordFromRedis (id) {
	try{
		let data = await getAllOrders();
		if ( !data){
			data = [];
		}
		else {
			data.forEach((e,i)=>{
				if(e.id==id){
					data.splice(i,1);
				}
			});
		}

		redisClient.set("rns_orders",JSON.stringify(data));
		redisClient.save();
		return true;
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting orders from redis'});
		console.log(clc.red(e));
	}
}

async function getAllOrders () {
	try{
		let savedOrders = [];
		return new Promise((resolve,reject)=>{
			redisClient.get(channelId,function (err,data) {
				try {
					if ( err ) {
						throw err;
					} else {
						if ( data == null ) {
							savedOrders = [];
						} else {
							console.log(data);
							savedOrders = JSON.parse(data);
						}
					}
				} catch (e) {
					reject(e);
				}
				finally {
					resolve(savedOrders);
				}
			});
		});
	}
	catch (e) {
		console.log(e);
		return new Error('something went wrong while adding key to redis')
	}
}

module.exports = {
	copyAllRecordToRedis,
	getAllOrders,
	appendRecordToRedis,
	deleteSingleRecordFromRedis
};
