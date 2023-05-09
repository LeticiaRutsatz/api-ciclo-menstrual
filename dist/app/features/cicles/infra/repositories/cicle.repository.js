"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicleRepository = void 0;
const data_source_1 = require("../../../../shared/db/data-source");
const entities_1 = require("../../../../shared/db/entities");
class CicleRepository {
    constructor() {
        this._repository = data_source_1.AppDataSource.getRepository(entities_1.Cicle);
    }
    async saveNewCicle(cicle) {
        const entity = this._repository.create({
            startDate: cicle.startDate,
            endDate: cicle.endDate,
            flow: cicle.flow,
            symptoms: cicle.symptoms,
            duration: cicle.duration,
            fertileDays: cicle.fertileDays,
            ovulationDay: cicle.ovulationDay,
            userId: cicle.userId,
        });
        await this._repository.save(entity);
        return {
            id: entity.id,
            userId: entity.userId,
            startDate: entity.startDate,
            endDate: entity.endDate,
            flow: entity.flow,
            symptoms: entity.symptoms,
            duration: entity.duration,
            fertileDays: entity.fertileDays,
            ovulationDay: entity.ovulationDay,
        };
    }
    async verifyCicleExits(cicle) {
        const exist = await this._repository.findOne({
            where: {
                userId: cicle.userId,
                startDate: cicle.startDate,
                endDate: cicle.endDate,
            },
        });
        return !!exist;
    }
    async getAllCicles() {
        const entities = this._repository.find();
        return entities;
    }
    async getCicleById(id, userId) {
        const entity = this._repository.findOneBy({ id, userId });
        if (!entity) {
            return null;
        }
        return entity;
    }
    async deleteCiclebyId(id) {
        const cicleDeleted = await this._repository.delete(id);
        return cicleDeleted;
    }
}
exports.CicleRepository = CicleRepository;
