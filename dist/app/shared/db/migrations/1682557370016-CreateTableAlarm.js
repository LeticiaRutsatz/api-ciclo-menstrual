"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableAlarm1682557370016 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableAlarm1682557370016 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'alarm',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'receive_notifications',
                    type: 'boolean',
                    default: false,
                    isNullable: false,
                },
                {
                    name: 'alarm_time',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                    isNullable: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    name: 'fk_user_alarm',
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('alarm', true, true, true);
    }
}
exports.CreateTableAlarm1682557370016 = CreateTableAlarm1682557370016;
