"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropColumnToAlarm1683491651477 = void 0;
const typeorm_1 = require("typeorm");
class DropColumnToAlarm1683491651477 {
    async up(queryRunner) {
        await queryRunner.dropColumn('alarm', 'receive_notifications');
    }
    async down(queryRunner) {
        await queryRunner.addColumn('alarm', new typeorm_1.TableColumn({
            name: 'receive_notifications',
            type: 'boolean',
            default: false,
        }));
    }
}
exports.DropColumnToAlarm1683491651477 = DropColumnToAlarm1683491651477;
