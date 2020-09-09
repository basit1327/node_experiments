const clc = require('cli-color');
const Kafka = require('kafka-node');

const client = new Kafka.KafkaClient({kafkaHost: '127.0.0.1:9092'});
const Producer = Kafka.Producer;
const Consumer = Kafka.Consumer;
var producer = new Producer(client,  {requireAcks: 0, partitionerType: 2});
var consumer = null;
var producerReady = false;
var consumerReady = false;

const topicTitle = 'rns_orders';

const topicToCreate = [
	{
		topic:topicTitle,
		partitions: 1,
		replicationFactor: 1
	}
];

client.createTopics(topicToCreate, (error, result) => {
	if ( error ){
		console.log(clc.red('OOps failed to create topic'),error);
	}
	else {
		console.log(clc.green('Topic Created Successfully'));
		createConsumer();
	}
});

function createConsumer (){
	consumer = new Consumer(
			client,
			[{ topic: 'rns_orders', partition: 0 ,offset:0 }],
			{fromOffset: true}
		);

	consumerReady = true;

	consumer.on('message', function (message) {
		console.log(clc.green('consumer receive a new message'),message);
	});
}

producer.on('ready', async function() {
	console.log(clc.green('KAFKA producer is ready'));
	producerReady=true;
	// sendTopicMessage();
});

function sendTopicMessage ( ) {
	payloads = [
		{ topic: topicTitle, messages: ['hello kafka...'] },
		// { topic: 'topic2', messages: ['send multiple messages on multiple topic'] }
	];
	producer.send(payloads, function (err, data) {
		console.log('Producer send=>',data);
	});
}
