"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColunmAtCiclesTable1683482109448 = void 0;
const typeorm_1 = require("typeorm");
class AddColunmAtCiclesTable1683482109448 {
    async up(queryRunner) {
        await queryRunner.addColumn('cicles', new typeorm_1.TableColumn({
            name: 'symptoms',
            type: 'enum',
            enum: ['headache', 'colic', 'sensitivity', 'irritation', 'nausea', 'fatigue'],
            isArray: true,
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('cicles', 'symptoms');
    }
}
exports.AddColunmAtCiclesTable1683482109448 = AddColunmAtCiclesTable1683482109448;
