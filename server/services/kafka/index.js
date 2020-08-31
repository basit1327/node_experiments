// const clc = require('cli-color');
// const Kafka = require('kafka-node');
//
// const Producer = Kafka.Producer;
// const Consumer = Kafka.Consumer;
// const client = new Kafka.KafkaClient({kafkaHost: '127.0.0.1:2181'});
// const producer = new Producer(client,  {requireAcks: 0, partitionerType: 2});
//
// const topic = 'rns_orders';
//
// const topicToCreate = [{
// 	topic,
// 	partitions: 1,
// 	replicationFactor: 1
// }
// ];
//
//
// console.log(client);
// client.createTopics(topicToCreate, (error, result) => {
// 	if ( error ){
// 		console.log(clc.red('OOps'));
// 	}
// 	else {
// 		console.log('YES');
// 	}
// 	// result is an array of any errors if a given topic could not be created
// 	console.log(result, 'topic created successfully');
// });
//
// // const consumer = new Consumer(client,[{ topic: 'rns_orders', partition: 0 }]);
//
// // var producerReady = false;
// // var consumerReady = false;
// //
// // console.log(client);
// //
// producer.on('ready', async function() {
// 	console.log(clc.green('KAFKA producer is ready'));
// 	producerReady=true;
// });
// //
// // producer.on('error', function(err) {
// // 	console.log(clc.red('KAFKA producer error',err));
// // });
//
// // const pushDataToKafka =(dataToPush) => {
// // 	try {
// // 		if ( producerReady ){
// // 			let payloadToKafkaTopic = [{topic: 'rns_orders', messages: JSON.stringify(dataToPush) }];
// // 			producer.send(payloadToKafkaTopic, (err, data) => {
// // 				console.log('data:', data);
// // 			});
// // 		}
// // 		else {
// // 			console.log('Producer not ready');
// // 		}
// // 	}
// // 	catch(error) {
// // 		console.log(error);
// // 	}
// // };
//
//
//
// const pushDataToKafka =(dataToPush) => {
//
// 	try {
// 		let payloadToKafkaTopic = [{topic: 'config.KafkaTopic', messages: JSON.stringify(dataToPush) }];
// 		console.log(payloadToKafkaTopic);
// 		producer.on('ready', async function() {
// 			console.log('========== READY');
// 			producer.send(payloadToKafkaTopic, (err, data) => {
// 				console.log('data: ', data);
// 			});
//
// 			producer.on('error', function(err) {
// 				//  handle error cases here
// 			})
// 		})
// 	}
// 	catch(error) {
// 		console.log(error);
// 	}
//
// };
//
// const jsonData = {id:1,side:'buy',price:11.2};
//
// function readDataFromKafka () {
// 	try {
// 		const Consumer = Kafka.Consumer;
// 		let consumer = new Consumer(
// 			client,
// 			[{ topic: 'rns_orders', partition: 0 }],
// 			{
// 				autoCommit: true,
// 				fetchMaxWaitMs: 1000,
// 				fetchMaxBytes: 1024 * 1024,
// 				encoding: 'utf8',
// 				// fromOffset: false
// 			}
// 		);
// 		consumer.on('message', async function(message) {
// 			console.log('NEW MESSAGE IN KAFKA');
// 			console.log(
// 				'kafka ',
// 				JSON.parse(message.value)
// 			);
// 		})
// 		consumer.on('error', function(error) {
// 			//  handle error
// 			console.log('error', error);
// 		});
// 	}
// 	catch(error) {
// 		// catch error trace
// 		console.log(error);
// 	}
// }
//
// // readDataFromKafka()
//
// // setTimeout(()=>{pushDataToKafka(jsonData)},1000);
