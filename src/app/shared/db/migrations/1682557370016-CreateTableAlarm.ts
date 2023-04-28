import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAlarm1682557370016 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('alarm', true, true, true);
  }
}
