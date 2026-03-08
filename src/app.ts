import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { setupSwagger } from './utils/swagger';
import { apiLimiter } from './middlewares/rateLimiter';
import { errorHandler } from './middlewares/errorHandler';
import prisma from './infrastructure/database/prisma';
import redisClient from './infrastructure/redis/redis-client';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(apiLimiter);

// Setup Swagger UI
setupSwagger(app);

// API Routes
import apiRoutes from './routes';
app.use('/api/v1', apiRoutes);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: API Health Check
 *     description: Returns the health status of the API, Database, and Redis server.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: number
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: string
 *                     redis:
 *                       type: string
 *       503:
 *         description: Service Unavailable - A dependent service is down
 */
// Health Check
app.get('/health', async (req: Request, res: Response) => {
  const health = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    services: {
      database: 'down',
      redis: 'down',
    }
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'up';
  } catch (e) {
    health.message = 'ERROR';
  }

  try {
    if (redisClient.isReady) {
      health.services.redis = 'up';
    }
  } catch (e) {
    health.message = 'ERROR';
  }

  res.status(health.message === 'OK' ? 200 : 503).json(health);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Base API Route
 *     description: Returns a welcome message from the API.
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Fintech Backend API
 */
// Base Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Fintech Backend API' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
