import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColunmAtCiclesTable1683482109448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'cicles',
      new TableColumn({
        name: 'symptoms',
        type: 'enum',
        enum: ['headache', 'colic', 'sensitivity', 'irritation', 'nausea', 'fatigue'],
        isArray: true,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('cicles', 'symptoms');
  }
}
