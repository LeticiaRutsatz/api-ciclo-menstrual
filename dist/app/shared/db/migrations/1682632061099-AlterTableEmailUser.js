"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableEmailUser1682632061099 = void 0;
const typeorm_1 = require("typeorm");
class AlterTableEmailUser1682632061099 {
    async up(queryRunner) {
        await queryRunner.addColumn('users', new typeorm_1.TableColumn({
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn('users', 'email');
    }
}
exports.AlterTableEmailUser1682632061099 = AlterTableEmailUser1682632061099;
