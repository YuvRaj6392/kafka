import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({groupId: "my-app3"});


async function main() {

  await consumer.connect();
  await consumer.subscribe({
    topic: "payment-done", fromBeginning: true
  })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  })
}


main();

//we groupId is same then even if you have multiple instances of consumer, it will be sent only to one. To avoid this we need partitioning