import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterAircraftAddUpdatedAt1622663272026
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'aircrafts',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('aircrafts', 'updated_at')
  }
}
