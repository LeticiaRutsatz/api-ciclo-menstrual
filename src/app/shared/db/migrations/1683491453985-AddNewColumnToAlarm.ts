import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnToAlarm1683491453985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'alarm',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('alarm', 'updated_at');
  }
}
