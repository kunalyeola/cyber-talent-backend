"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const errorHandler_1 = require("../../middlewares/errorHandler");
class GetUser {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new errorHandler_1.AppError('User not found', 404);
        }
        return user;
    }
}
exports.GetUser = GetUser;
