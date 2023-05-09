"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../../../../shared/db/data-source");
const entities_1 = require("../../../../shared/db/entities");
class UserRepository {
    constructor() {
        this._repository = data_source_1.AppDataSource.getRepository(entities_1.User);
    }
    async saveNewUser(user) {
        const entity = this._repository.create({
            name: user.name,
            email: user.email,
            password: user.password,
            birthDate: user.birthDate,
        });
        await this._repository.save(entity);
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            birthDate: entity.birthDate,
        };
    }
    async getAllUsers() {
        const entities = this._repository.find();
        return entities;
    }
    async getUserById(idUser) {
        const entity = this._repository.findOneBy({ id: idUser });
        if (!entity) {
            return null;
        }
        return entity;
    }
    async updateUser(user, id) {
        console.log(user);
        await this._repository.update(id, {
            email: user.email,
            password: user.password,
        });
        const entity = this._repository.findOneBy({ id: id });
        return entity;
    }
    async deleteUserbyId(id) {
        const userDeleted = await this._repository.delete(id);
        return userDeleted;
    }
}
exports.UserRepository = UserRepository;
