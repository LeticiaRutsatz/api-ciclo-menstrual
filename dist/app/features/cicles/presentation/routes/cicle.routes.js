"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cicle_controller_1 = require("../controllers/cicle.controller");
const middlewares_1 = require("../middlewares");
const middlewares_2 = require("../../../../shared/middlewares");
const cicle_exists_validator_1 = require("../middlewares/cicle-exists-validator");
exports.default = () => {
    const router = express_1.default.Router();
    router.post('/users/:userId/cicles', middlewares_2.authValidator, cicle_exists_validator_1.cicleExitsCicleValidator, middlewares_1.createCicleValidator, new cicle_controller_1.CicleController().createCicle);
    router.get('/users/:userId/cicles', middlewares_2.authValidator, new cicle_controller_1.CicleController().getCicles);
    router.get('/users/:userId/cicles/:id', middlewares_2.authValidator, new cicle_controller_1.CicleController().getCicles);
    router.delete('/users/:userId/cicles/:id', middlewares_2.authValidator, new cicle_controller_1.CicleController().deleteCiclebyId);
    return router;
};
