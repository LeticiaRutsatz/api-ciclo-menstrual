"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmController = void 0;
const http_helper_1 = require("../../../../shared/adapter/http.helper");
require("dotenv/config");
const alarm_repository_1 = require("../../infra/repositories/alarm.repository");
class AlarmController {
    async createAlarm(req, res) {
        const { alarmTime } = req.body;
        const { userId } = req.params;
        const response = new http_helper_1.ResponseHelper();
        const alarmRepository = new alarm_repository_1.AlarmRepository();
        try {
            const newAlarm = { userId, alarmTime };
            const alarm = await alarmRepository.saveNewAlarm(newAlarm);
            return response.success('Alarm created successfully!', res, alarm);
        }
        catch (err) {
            return response.error('Error creating Alarm!', res, err);
        }
    }
    async getAlarm(req, res) {
        const { userId, id } = req.params;
        const response = new http_helper_1.ResponseHelper();
        const alarmRepository = new alarm_repository_1.AlarmRepository();
        try {
            if (!id && !userId) {
                if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
                    return response.badRequest('You do not have the necessary access!', res);
                }
                const alarms = await alarmRepository.getAllAlarms();
                return response.success('All alarms from the application!', res, alarms);
            }
            const alarm = await alarmRepository.getAlarmById(id);
            if (!alarm) {
                return response.badRequest('this ID do not exist!', res, id);
            }
            return response.success('Alarm search with success!', res, alarm);
        }
        catch (err) {
            return response.error('Error getting alarm!', res, err);
        }
    }
    async updateAlarm(req, res) {
        const { id, userId } = req.params;
        const { alarmTime } = req.body;
        const response = new http_helper_1.ResponseHelper();
        const alarmRepository = new alarm_repository_1.AlarmRepository();
        try {
            const alarmUpdate = await alarmRepository.updateAlarm({ userId, alarmTime }, id);
            if (!alarmUpdate) {
                return response.badRequest('Alarm not updated!', res);
            }
            return response.success('Alarm updated with success!', res, alarmUpdate);
        }
        catch (err) {
            return response.error('Error updating Alarm!', res, err);
        }
    }
    async deleteAlarmbyId(req, res) {
        const { userId, id } = req.params;
        const response = new http_helper_1.ResponseHelper();
        const alarmRepository = new alarm_repository_1.AlarmRepository();
        try {
            const alarmDeleted = await alarmRepository.getAlarmById(id);
            await alarmRepository.deleteAlarmbyId(id);
            return response.success('Alarm deleted!', res, alarmDeleted);
        }
        catch (err) {
            return response.error('Error deleting alarm!', res, err);
        }
    }
}
exports.AlarmController = AlarmController;
