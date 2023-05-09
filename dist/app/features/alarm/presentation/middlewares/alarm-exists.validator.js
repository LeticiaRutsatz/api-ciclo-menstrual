"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alarmExitsCicleValidator = void 0;
const http_helper_1 = require("../../../../shared/adapter/http.helper");
const alarm_repository_1 = require("../../infra/repositories/alarm.repository");
const alarmExitsCicleValidator = async (req, res, next) => {
    const { userId } = req.params;
    const response = new http_helper_1.ResponseHelper();
    const alarmRepository = new alarm_repository_1.AlarmRepository();
    const alarmExist = await alarmRepository.verifyAlarmExits(userId);
    if (alarmExist) {
        return response.badRequest('This account already have an alarm!', res);
    }
    next();
};
exports.alarmExitsCicleValidator = alarmExitsCicleValidator;
