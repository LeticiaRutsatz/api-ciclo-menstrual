"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("../../app/features/users/presentation/routes/user.routes"));
const cicle_routes_1 = __importDefault(require("../../app/features/cicles/presentation/routes/cicle.routes"));
const auth_routes_1 = __importDefault(require("../../app/features/authentication/presentation/routes/auth.routes"));
const alarm_routes_1 = __importDefault(require("../../app/features/alarm/presentation/routes/alarm.routes"));
exports.default = (app) => {
    app.get('/', (req, res) => res.status(200).json('API is runing!'));
    app.use((0, user_routes_1.default)());
    app.use((0, cicle_routes_1.default)());
    app.use((0, auth_routes_1.default)());
    app.use((0, alarm_routes_1.default)());
};
