"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("./entities");
require("dotenv/config");
const migrations_1 = __importDefault(require("./migrations"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    logging: true,
    entities: [entities_1.User, entities_1.Cicle, entities_1.Alarm],
    migrations: migrations_1.default,
});
