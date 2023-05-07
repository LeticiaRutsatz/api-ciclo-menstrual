import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropColumnToAlarm1683491651477 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('alarm', 'receive_notifications');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'alarm',
      new TableColumn({
        name: 'receive_notifications',
        type: 'boolean',
        default: false,
      }),
    );
  }
}
