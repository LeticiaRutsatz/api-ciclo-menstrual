import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeColunmAtCiclesTable1683488657588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cicles',
      'symptoms',
      new TableColumn({
        name: 'symptoms',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'cicles',
      'symptoms',
      new TableColumn({
        name: 'symptoms',
        type: 'enum',
        enum: ['headache', 'colic', 'sensitivity', 'irritation', 'nausea', 'fatigue'],
        isArray: true,
        isNullable: true,
      }),
    );
  }
}
