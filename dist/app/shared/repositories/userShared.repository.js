"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSharedRepository = void 0;
const data_source_1 = require("../db/data-source");
const entities_1 = require("../db/entities");
class UserSharedRepository {
    constructor() {
        this._repository = data_source_1.AppDataSource.getRepository(entities_1.User);
    }
    async searchEmail(email, options) {
        const user = await this._repository.findOneBy({ email });
        if (!user)
            return undefined;
        return this.mapperToUserDetail(user, options);
    }
    mapperToUserDetail(entity, options) {
        return {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            password: options != null && options ? entity.password : undefined,
        };
    }
}
exports.UserSharedRepository = UserSharedRepository;
