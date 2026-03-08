import dotenv from 'dotenv';
import app from './app';
import logger from './utils/logger';
import { initPrisma } from './infrastructure/database/prisma';
import { initRedis } from './infrastructure/redis/redis-client';
import { initKafka } from './infrastructure/kafka/kafka-client';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initPrisma();
    await initRedis();
    await initKafka();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
