"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
require("dotenv/config");
require("reflect-metadata");
const data_source_1 = require("../app/shared/db/data-source");
const port = process.env.PORT || 8080;
data_source_1.AppDataSource.initialize().then(() => {
    app_1.default.listen(port, () => console.log('listening on port ' + port));
});
