"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initKafka = exports.getKafkaConsumer = exports.getKafkaProducer = void 0;
const kafkajs_1 = require("kafkajs");
const logger_1 = __importDefault(require("../../utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const kafka = new kafkajs_1.Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || 'fintech-backend',
    brokers: [process.env.KAFKA_BROKERS || 'localhost:9092'],
});
const getKafkaProducer = () => {
    return kafka.producer();
};
exports.getKafkaProducer = getKafkaProducer;
const getKafkaConsumer = (groupId) => {
    return kafka.consumer({ groupId });
};
exports.getKafkaConsumer = getKafkaConsumer;
const initKafka = async () => {
    try {
        const producer = (0, exports.getKafkaProducer)();
        await producer.connect();
        logger_1.default.info('Kafka Producer Connected');
        await producer.disconnect();
        logger_1.default.info('Kafka Client Initialized successfully');
    }
    catch (error) {
        logger_1.default.error('Kafka connection failed:', error);
    }
};
exports.initKafka = initKafka;
