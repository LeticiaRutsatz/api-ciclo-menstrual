"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwtKey = process.env.JWT_KEY;
class JwtToken {
    sign(token) {
        return jsonwebtoken_1.default.sign(token, jwtKey, { expiresIn: '1h' });
    }
    verify(token) {
        return jsonwebtoken_1.default.verify(token, jwtKey, { maxAge: '1h' });
    }
}
exports.JwtToken = JwtToken;
