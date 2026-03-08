"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = __importDefault(require("../../infrastructure/database/prisma"));
class UserRepository {
    async findById(id) {
        return prisma_1.default.user.findUnique({ where: { id } });
    }
}
exports.UserRepository = UserRepository;
