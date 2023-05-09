"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNewColumnToAlarm1683491453985 = void 0;
const typeorm_1 = require("typeorm");
class AddNewColumnToAlarm1683491453985 {
    async up(queryRunner) {
        await queryRunner.addColumn('alarm', new typeorm_1.TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('alarm', 'updated_at');
    }
}
exports.AddNewColumnToAlarm1683491453985 = AddNewColumnToAlarm1683491453985;
