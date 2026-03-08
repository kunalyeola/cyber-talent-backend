import { UserRepository } from '../../adapters/repositories/UserRepository';
import { AppError } from '../../middlewares/errorHandler';

export class GetUser {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return user;
  }
}
