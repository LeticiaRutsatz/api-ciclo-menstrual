"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmRepository = void 0;
const data_source_1 = require("../../../../shared/db/data-source");
const entities_1 = require("../../../../shared/db/entities");
class AlarmRepository {
    constructor() {
        this._repository = data_source_1.AppDataSource.getRepository(entities_1.Alarm);
    }
    async saveNewAlarm(alarm) {
        const entity = this._repository.create({
            alarmTime: alarm.alarmTime,
            userId: alarm.userId,
        });
        await this._repository.save(entity);
        return {
            id: entity.id,
            userId: entity.userId,
            alarmTime: entity.alarmTime,
        };
    }
    async verifyAlarmExits(userId) {
        const exist = await this._repository.findOne({
            where: {
                userId: userId,
            },
        });
        return !!exist;
    }
    async getAllAlarms() {
        const entities = this._repository.find();
        return entities;
    }
    async getAlarmById(id) {
        const entity = this._repository.findOneBy({ id });
        if (!entity) {
            return null;
        }
        return entity;
    }
    async updateAlarm(alarm, id) {
        await this._repository.update(id, {
            userId: alarm.userId,
            alarmTime: alarm.alarmTime,
        });
        const entity = this._repository.findOneBy({ id: id });
        return entity;
    }
    async deleteAlarmbyId(id) {
        const alarmDeleted = await this._repository.delete(id);
        return alarmDeleted;
    }
}
exports.AlarmRepository = AlarmRepository;
