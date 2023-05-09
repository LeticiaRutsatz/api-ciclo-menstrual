"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExistsValidator = void 0;
const http_helper_1 = require("../../../../shared/adapter/http.helper");
const user_repository_1 = require("../../infra/repositories/user.repository");
const uuid_1 = require("uuid");
const userExistsValidator = async (req, res, next) => {
    const { userId } = req.params;
    const response = new http_helper_1.ResponseHelper();
    const userRepository = new user_repository_1.UserRepository();
    if (!userId) {
        return response.badRequest('Please send a ID!', res);
    }
    if (!(0, uuid_1.validate)(userId)) {
        return response.badRequest('this ID do not exist!', res);
    }
    const exists = await userRepository.getUserById(userId);
    if (!exists) {
        return response.badRequest('This user do not exist!', res);
    }
    next();
};
exports.userExistsValidator = userExistsValidator;
