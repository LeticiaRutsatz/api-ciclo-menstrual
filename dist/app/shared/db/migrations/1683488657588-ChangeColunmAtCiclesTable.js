"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeColunmAtCiclesTable1683488657588 = void 0;
const typeorm_1 = require("typeorm");
class ChangeColunmAtCiclesTable1683488657588 {
    async up(queryRunner) {
        await queryRunner.changeColumn('cicles', 'symptoms', new typeorm_1.TableColumn({
            name: 'symptoms',
            type: 'text',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.changeColumn('cicles', 'symptoms', new typeorm_1.TableColumn({
            name: 'symptoms',
            type: 'enum',
            enum: ['headache', 'colic', 'sensitivity', 'irritation', 'nausea', 'fatigue'],
            isArray: true,
            isNullable: true,
        }));
    }
}
exports.ChangeColunmAtCiclesTable1683488657588 = ChangeColunmAtCiclesTable1683488657588;
