const kafka = require('kafka-node');

// Inputs
const args       = require('minimist')(process.argv.slice(2));
const message    = args.m || "test message";
const topic      = args.t || 'test';
const partition  = args.p || 0;
const attributes = args.a || 0;

// Connection
const client   = new kafka.Client('localhost:2181');
const producer = new kafka.Producer(client, { requireAcks: 1 });

// Producer
producer.on('ready', () => {
  const keyedMessage = new kafka.KeyedMessage('keyed', 'a keyed message');
  producer.send([
    { topic: topic, partition: partition, messages: [message, keyedMessage], attributes: attributes }
  ], (err, result) => {
    console.log(err || result);
    process.exit();
  });
});

producer.on('error', (err) => {
  console.log('error', err);
});
