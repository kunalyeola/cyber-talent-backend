"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const GetUser_1 = require("../../use-cases/users/GetUser");
const userRepository = new UserRepository_1.UserRepository();
const getUserUseCase = new GetUser_1.GetUser(userRepository);
class UserController {
    async getUser(req, res, next) {
        try {
            const id = req.params.id;
            const user = await getUserUseCase.execute(id);
            res.status(200).json({
                status: 'success',
                data: {
                    user,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
