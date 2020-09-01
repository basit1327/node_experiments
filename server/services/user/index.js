'use strict';
const _ = require('lodash'),
	clc = require('cli-color'),
	// redisServices = require('../redis'),
	// kafkaServices = require('../kafka'),
	mongooseTesting = require('../mongoose_testing'),
	sequelizeTesting = require('../sequelize_testing/script'),
	tsTesting = require('../typescript_testing/index.js'),
	{failedToGetDatabaseConnection} = require('../../../configs/res_codes'),
	DbConnection = require('../../dataaccess/dbconnection').DbConnection;


async function addBuyOrder (req,res){
	try {
		let price = req.query.price;
		if ( !price || !parseFloat(price)) {
			res.send({status:400,detail:'Invalid request, Order price must be specified'});
			return;
		}

		let isSamePrice = await priceChecker('sell',price);

		if ( isSamePrice instanceof Error){
			res.send({status:400,detail:isSamePrice.message});
		} else {
			addOrderExecutor('buy',parseFloat(price),res);
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while adding your buy order'});
		console.log(clc.red(e));
	}
}

async function addSellOrder (req,res){
	try {
		let price = req.query.price;
		if ( !price || !parseFloat(price)) {
			res.send({status:400,detail:'Invalid request, Order price must be specified'});
			return;
		}

		let isSamePrice = await priceChecker('buy',price);

		if ( isSamePrice instanceof Error){
			res.send({status:400,detail:isSamePrice.message});
		} else {
			addOrderExecutor('sell',parseFloat(price),res);
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while adding your sell order'});
		console.log(clc.red(e));
	}
}

async function addOrderExecutor (side,price,res){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`INSERT INTO orders (side,price) VALUES (?,?)`,[side,price]);
			if ( _.has(dbRes,'insertId') ){
				// Adding record to redis as well
				redisServices.appendRecordToRedis({id:dbRes.insertId,side,price});
				res.send({status:200,detail:`${side} order has been saved, your order-id: ${dbRes.insertId}`});
			} else {
				res.send({status:400,detail:`Failed to add your ${side} order`});
			}
		} else {
			res.send({status: 400, detail: failedToGetDatabaseConnection.description});
		}
	}
	catch (e) {
		res.send({status: 400, detail: `something went wrong while adding your ${side} order`});
		console.log(clc.red(e));
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function priceChecker (side,price){
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let dbRes = await connection.query(`SELECT * FROM orders WHERE side = ? AND price= ? LIMIT 1`,[side,price]);
			if ( _.has(dbRes,'[0].id') ){
				console.log(clc.red('Same price for an order exist, deleting both of those entries'));

				// Deleting from Database
				await connection.query(`DELETE FROM orders WHERE side = ? AND price = ? LIMIT 1`,[side,price]);

				// Deleting from Redis
				redisServices.deleteSingleRecordFromRedis(dbRes[0].id);

				return new Error('Same price was exist, both entries are deleted');
			} else {
				return false;
			}
		} else {
			return new Error('Something went wrong with price checking');
		}
	}
	catch (e) {
		return new Error('Something went wrong with price checking');
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}


//region Redis Functions
async function storeDataInRedis(req,res) {
	console.log(clc.magenta( '== Copying Orders record to Redis =='));

	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let data = await connection.query(`SELECT * from orders`);
			if ( data ){
				let records = [];
				data.forEach(e=>{
					records.push({id:e.id,side:e.side,price:e.price});
				});
				redisServices.copyAllRecordToRedis(records);
				res.send({status:200,detail:'Orders record has been copied to Redis'});
				console.log(clc.green( '== Orders record has been copied to Redis =='));
			}
		} else {
			console.log(clc.red('failed to get orders record from database: ',failedToGetDatabaseConnection.description));
		}
	}
	catch (e) {
		console.log(clc.red('failed to get orders record from database: ',e));
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
}

async function getDataFromRedis(req,res){
	try{
		let data = await redisServices.getAllOrders();
		if ( !data){
			res.send({status: 400, detail: 'No record saved in redis'});
		}
		else {
			// data = data.toString().replace('/','');
			// data = data.replace("'","");
			// data = JSON.parse('['+data+']');
			res.send({status:200,detail:'All orders record from redis',data});
		}
	}
	catch (e) {
		res.send({status: 400, detail: 'something went wrong while getting orders from redis'});
		console.log(clc.red(e));
	}
}
//endregion

//region Binary Tree Functions
var buyOrdersArray = [], sellOrdersArray = [];
(async getAllOrders=> {
	let connection;
	try {
		connection = await new DbConnection().getConnection();
		if ( connection ) {
			let data = await connection.query(`SELECT * from orders`);
			if ( data && data.length>0 ){
				data.forEach(e=>{
					if ( e.side=='buy')
						buyOrdersArray.push(e.price);
					else
						sellOrdersArray.push(e.price);
				});

				var tree_for_buy_orders = buyOrdersArray.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null);
				var tree_for_sell_orders = sellOrdersArray.reduce((t, v) => t ? insertNode(t, v) : new Node(v), null);
				console.log('TREE OF BUY ORDERS',tree_for_buy_orders);
				console.log('TREE OF SELL ORDERS',tree_for_sell_orders);
			}
		} else {
			console.log(clc.red('failed to get orders record from database: ',failedToGetDatabaseConnection.description));
		}
	}
	catch (e) {
		console.log(clc.red('failed to get orders record from database: ',e));
	}
	finally {
		if ( connection ) {
			connection.release();
		}
	}
});

function Node(value) {
	this.value = value;
	this.left = null;
	this.right = null;
}

function insertNode(tree,value) {
	var node = tree,
		key;
	while (node.value !== value) {
		key = value < node.value ? 'left' : 'right';
		if (!node[key]) {
			node[key] = new Node(value);
			break;
		}
		node = node[key];
	}

	return tree;
}
//endregion


(runTScriptTesting=>{
	var obj = new tsTesting.Greeting();
	obj.greet()
})();


module.exports = {
	addBuyOrder,
	addSellOrder,
	storeDataInRedis,
	getDataFromRedis
};
