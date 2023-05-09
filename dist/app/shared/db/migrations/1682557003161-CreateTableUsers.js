"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUsers1682557003161 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUsers1682557003161 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'birth_date',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'text',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users', true, true, true);
    }
}
exports.CreateTableUsers1682557003161 = CreateTableUsers1682557003161;
