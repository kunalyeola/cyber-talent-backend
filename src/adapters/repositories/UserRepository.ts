import prisma from '../../infrastructure/database/prisma';
import { User } from '@prisma/client';

export class UserRepository {
  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  // Future methods (create, findByEmail, etc.) can be added here
}
