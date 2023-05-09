"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
exports.default = () => {
    const router = express_1.default.Router();
    router.post('/login', middlewares_1.loginUserValidator, new controllers_1.AuthController().login);
    return router;
};
