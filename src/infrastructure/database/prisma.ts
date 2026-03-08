import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const initPrisma = async () => {
  try {
    await prisma.$connect();
    logger.info('Prisma Client connected to database successfully.');
  } catch (error) {
    logger.error('Error connecting to database via Prisma:', error);
    throw error;
  }
};

export default prisma;
