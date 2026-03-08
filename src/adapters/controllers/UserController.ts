import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { GetUser } from '../../use-cases/users/GetUser';

const userRepository = new UserRepository();
const getUserUseCase = new GetUser(userRepository);

export class UserController {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const user = await getUserUseCase.execute(id);
      
      res.status(200).json({
        status: 'success',
        data: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
