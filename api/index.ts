import app from '../src/app';
import { initPrisma } from '../src/infrastructure/database/prisma';
import { initRedis } from '../src/infrastructure/redis/redis-client';
import { initKafka } from '../src/infrastructure/kafka/kafka-client';

// Initialize external services for serverless environment
// Note: In a real serverless deployment (Vercel), you must ensure your
// datastores (Postgres, Redis, Kafka) are accessible via public URIs 
// and handle connection limits (e.g., Prisma Accelerate/PgBouncer).
let isInitialized = false;

const initializeServices = async () => {
  if (!isInitialized) {
    try {
      await initPrisma();
      await initRedis();
      await initKafka();
      isInitialized = true;
    } catch (e) {
      console.error('Failed to initialize services for serverless', e);
    }
  }
};

// Start initialization in background (Vercel will keep the instance warm)
initializeServices();

export default app;
