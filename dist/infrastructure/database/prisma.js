"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPrisma = void 0;
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const logger_1 = __importDefault(require("../../utils/logger"));
const connectionString = process.env.DATABASE_URL;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
const initPrisma = async () => {
    try {
        await prisma.$connect();
        logger_1.default.info('Prisma Client connected to database successfully.');
    }
    catch (error) {
        logger_1.default.error('Error connecting to database via Prisma:', error);
        throw error;
    }
};
exports.initPrisma = initPrisma;
exports.default = prisma;
