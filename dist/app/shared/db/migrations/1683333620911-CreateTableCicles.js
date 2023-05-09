"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableCicles1683333620911 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableCicles1683333620911 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cicles',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'start_date',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'end_date',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'duration',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'fertile_days',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'ovulation_days',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'flow',
                    type: 'varchar',
                    length: '50',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
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
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    name: 'fk_users_cicles',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cicles', true, true, true);
    }
}
exports.CreateTableCicles1683333620911 = CreateTableCicles1683333620911;
