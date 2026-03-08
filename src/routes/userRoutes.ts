import { Router } from 'express';
import { UserController } from '../adapters/controllers/UserController';

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found successfully
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUser.bind(userController));

export default router;
