"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const swagger_1 = require("./utils/swagger");
const rateLimiter_1 = require("./middlewares/rateLimiter");
const errorHandler_1 = require("./middlewares/errorHandler");
const prisma_1 = __importDefault(require("./infrastructure/database/prisma"));
const redis_client_1 = __importDefault(require("./infrastructure/redis/redis-client"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(rateLimiter_1.apiLimiter);
// Setup Swagger UI
(0, swagger_1.setupSwagger)(app);
// API Routes
const routes_1 = __importDefault(require("./routes"));
app.use('/api/v1', routes_1.default);
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
app.get('/health', async (req, res) => {
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
        await prisma_1.default.$queryRaw `SELECT 1`;
        health.services.database = 'up';
    }
    catch (e) {
        health.message = 'ERROR';
    }
    try {
        if (redis_client_1.default.isReady) {
            health.services.redis = 'up';
        }
    }
    catch (e) {
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
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Fintech Backend API' });
});
// Error handling middleware
app.use(errorHandler_1.errorHandler);
exports.default = app;
