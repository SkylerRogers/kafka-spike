const kafka = require('kafka-node');

// Inputs
const args       = require('minimist')(process.argv.slice(2));
const message    = args.m || "test message";
const topic      = args.t || 'test';
const partition  = args.p || 0;
const attributes = args.a || 0;

// Connection
const client   = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:29092' });
const topics   = [{ topic: topic, partition: partition }];
const options  = { autoCommit: true, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };
const consumer = new kafka.Consumer(client, topics, options);
const offset   = new kafka.Offset(client);

// Consumer
consumer.on('message', (message) => {
  console.log(message);
});

consumer.on('error', (err) => {
  console.log('error', err);
});

// If consumer gets `offsetOutOfRange` event, fetch data from the smallest (oldest) offset
consumer.on('offsetOutOfRange', (topic) => {
  topic.maxNum = 2;
  offset.fetch([topic], (err, offsets) => {
    if (err) {
      return console.error(err);
    }
    const min = Math.min(offsets[topic.topic][topic.partition]);
    consumer.setOffset(topic.topic, topic.partition, min);
  });
});
