"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRedis = void 0;
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../../utils/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = (0, redis_1.createClient)({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});
redisClient.on('error', (err) => logger_1.default.error('Redis Client Error', err));
const initRedis = async () => {
    try {
        await redisClient.connect();
        logger_1.default.info('Redis Client Connected');
    }
    catch (error) {
        logger_1.default.error('Redis connection failed:', error);
    }
};
exports.initRedis = initRedis;
exports.default = redisClient;
