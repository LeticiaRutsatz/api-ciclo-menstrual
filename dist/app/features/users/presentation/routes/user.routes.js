"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../../../../shared/middlewares");
exports.default = () => {
    const router = express_1.default.Router();
    router.post('/users', middlewares_1.createUserValidator, new controllers_1.UserController().createUser);
    router.get('/users', middlewares_2.authValidator, new controllers_1.UserController().getUsers);
    router.get('/users/:userId', middlewares_1.userExistsValidator, new controllers_1.UserController().getUsers);
    router.put('/users/:userId', middlewares_2.authValidator, middlewares_1.userExistsValidator, middlewares_1.emailExistsValidator, middlewares_1.updateUserValidator, new controllers_1.UserController().updateUser);
    router.delete('/users/:userId', middlewares_2.authValidator, middlewares_1.userExistsValidator, new controllers_1.UserController().deleteUserbyId);
    return router;
};
