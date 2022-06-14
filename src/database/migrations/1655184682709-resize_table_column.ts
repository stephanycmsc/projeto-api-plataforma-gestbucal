import { MigrationInterface, QueryRunner } from "typeorm";

export class resizeTableColumn1655184682709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users__adresses ALTER COLUMN zipcode TYPE varchar(9);`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users__adresses ALTER COLUMN zipcode TYPE varchar(8);`)
  }
}
