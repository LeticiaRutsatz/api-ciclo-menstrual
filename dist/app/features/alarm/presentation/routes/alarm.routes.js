"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../../../../shared/middlewares");
const middlewares_2 = require("../../../users/presentation/middlewares");
const middlewares_3 = require("../middlewares");
const alarm_exists_validator_1 = require("../middlewares/alarm-exists.validator");
exports.default = () => {
    const router = express_1.default.Router();
    router.post('/users/:userId/alarm', middlewares_1.authValidator, middlewares_2.userExistsValidator, alarm_exists_validator_1.alarmExitsCicleValidator, middlewares_3.createAlarmValidator, new controllers_1.AlarmController().createAlarm);
    router.get('/users/:userId/alarm/:id', middlewares_1.authValidator, middlewares_2.userExistsValidator, new controllers_1.AlarmController().getAlarm);
    router.get('/users/alarm', middlewares_1.authValidator, new controllers_1.AlarmController().getAlarm);
    router.put('/users/:userId/alarm/:id', middlewares_1.authValidator, middlewares_3.createAlarmValidator, middlewares_2.userExistsValidator, new controllers_1.AlarmController().updateAlarm);
    router.delete('/users/:userId/alarm/:id', middlewares_1.authValidator, middlewares_2.userExistsValidator, new controllers_1.AlarmController().deleteAlarmbyId);
    return router;
};
