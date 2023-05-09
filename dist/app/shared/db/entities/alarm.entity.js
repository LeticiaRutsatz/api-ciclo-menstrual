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
exports.Alarm = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let Alarm = class Alarm extends base_entity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], Alarm.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'alarm_time' }),
    __metadata("design:type", String)
], Alarm.prototype, "alarmTime", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.alarm),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", user_entity_1.User)
], Alarm.prototype, "user", void 0);
Alarm = __decorate([
    (0, typeorm_1.Entity)({ name: 'alarm' })
], Alarm);
exports.Alarm = Alarm;
