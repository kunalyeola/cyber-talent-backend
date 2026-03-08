import { createClient, RedisClientType } from 'redis';
import logger from '../../utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const redisClient: RedisClientType = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));

export const initRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('Redis Client Connected');
  } catch (error) {
    logger.error('Redis connection failed:', error);
  }
};

export default redisClient;
