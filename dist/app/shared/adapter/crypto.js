"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BCryptPassword {
    async hashPassword(password) {
        return await bcrypt_1.default.hash(password, 8);
    }
    async comparePassword(password, hash) {
        return await bcrypt_1.default.compare(password, hash);
    }
}
exports.BCryptPassword = BCryptPassword;
