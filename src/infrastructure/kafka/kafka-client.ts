import { Kafka, Producer, Consumer } from 'kafkajs';
import logger from '../../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'fintech-backend',
  brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
});

export const getKafkaProducer = (): Producer => {
  return kafka.producer();
};

export const getKafkaConsumer = (groupId: string): Consumer => {
  return kafka.consumer({ groupId });
};

export const initKafka = async () => {
  try {
    const producer = getKafkaProducer();
    await producer.connect();
    logger.info('Kafka Producer Connected');
    await producer.disconnect();
    logger.info('Kafka Client Initialized successfully');
  } catch (error) {
    logger.error('Kafka connection failed:', error);
  }
};
