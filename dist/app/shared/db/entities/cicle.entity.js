"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cicle = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../../domain/enums");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let Cicle = class Cicle extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date' }),
    __metadata("design:type", String)
], Cicle.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date' }),
    __metadata("design:type", String)
], Cicle.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Cicle.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fertile_days' }),
    __metadata("design:type", String)
], Cicle.prototype, "fertileDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ovulation_days' }),
    __metadata("design:type", String)
], Cicle.prototype, "ovulationDay", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_1.Flow }),
    __metadata("design:type", String)
], Cicle.prototype, "flow", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Cicle.prototype, "symptoms", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Cicle.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.cicles),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], Cicle.prototype, "user", void 0);
Cicle = __decorate([
    (0, typeorm_1.Entity)({ name: 'cicles' })
], Cicle);
exports.Cicle = Cicle;
