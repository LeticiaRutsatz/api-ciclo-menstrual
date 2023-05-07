import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCicles1683333620911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cicles', true, true, true);
  }
}
