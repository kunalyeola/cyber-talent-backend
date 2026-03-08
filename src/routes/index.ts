import { Router } from 'express';
import userRoutes from './userRoutes';
// Import future routes here, e.g. import authRoutes from './authRoutes';

const router = Router();

// Mount child routes
router.use('/users', userRoutes);
// router.use('/auth', authRoutes);

export default router;
