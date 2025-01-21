const {
  KafkaAdmin,
  KafkaConnect,
} = require("@hireverse/kafka-communication/dist/kafka");
const {
  KafkaTopics,
} = require("@hireverse/kafka-communication/dist/events/topics");

const kafkaConfig = {
  clientId: "admin-client",
  brokers: ["localhost:9092"],
};

const kafkaConnect = new KafkaConnect(kafkaConfig);
const kafkaAdmin = new KafkaAdmin(kafkaConnect);

(async () => {
  try {
    await kafkaAdmin.connect();

    // Fetch existing topics
    const existingTopics = await kafkaAdmin.listTopics();

    const topicsToCreate = Object.values(KafkaTopics)
      .filter((tp) => !existingTopics.includes(tp))
      .map((tp) => ({
        topic: tp,
        numPartitions: 1,
        replicationFactor: 1,
      }));

    console.log("Topics to create:", topicsToCreate);

    if (topicsToCreate.length > 0) {
      const result = await kafkaAdmin.createTopics(topicsToCreate);
      console.log(
        result ? "Topics created successfully" : "No topics were created"
      );
    } else {
      console.log("All topics already exist, nothing to create.");
    }

    await kafkaAdmin.disconnect();
  } catch (error) {
    console.error("Error in Kafka Admin:", error);
  }
})();
