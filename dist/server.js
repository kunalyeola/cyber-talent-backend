"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./utils/logger"));
const prisma_1 = require("./infrastructure/database/prisma");
const redis_client_1 = require("./infrastructure/redis/redis-client");
const kafka_client_1 = require("./infrastructure/kafka/kafka-client");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await (0, prisma_1.initPrisma)();
        await (0, redis_client_1.initRedis)();
        await (0, kafka_client_1.initKafka)();
        app_1.default.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start the server:', error);
        process.exit(1);
    }
};
startServer();
