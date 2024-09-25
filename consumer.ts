import { Kafka } from 'kafkajs';

// Connect to Kafka
const kafka = new Kafka({
  clientId: 'mail-office',
  brokers: ['localhost:9092']
});

// Create a consumer (like the person checking the mailbox)
const consumer = kafka.consumer({ groupId: 'mailbox-group' });

const receiveLetter = async () => {
  await consumer.connect();
  // Subscribe to the topic (mailbox)
  await consumer.subscribe({ topic: 'letters', fromBeginning: true });

  // Receive the message (letter)
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received letter: ${message.value?.toString()}`);
    },
  });
}

receiveLetter();
