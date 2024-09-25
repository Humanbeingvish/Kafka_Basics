import { Kafka } from 'kafkajs';

// Connect to Kafka
const kafka = new Kafka({
  clientId: 'mail-office',
  brokers: ['localhost:9092'] // Kafka is running on your computer
});

// Create a producer (like the person who sends letters)
const producer = kafka.producer();

const sendLetter = async () => {
  await producer.connect();
  // Send a message (letter) to a topic (mailbox)
  await producer.send({
    topic: 'letters',
    messages: [{ value: 'Hello! This is your first Kafka message!' }],
  });

  console.log("Letter sent!");
  await producer.disconnect();
}

sendLetter();
