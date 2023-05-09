"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToAlarm1635501273378 = void 0;
const typeorm_1 = require("typeorm");
class AddColumnToAlarm1635501273378 {
    async up(queryRunner) {
        await queryRunner.addColumn('alarm', new typeorm_1.TableColumn({
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey('alarm', 'created_at');
    }
}
exports.AddColumnToAlarm1635501273378 = AddColumnToAlarm1635501273378;
