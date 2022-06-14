import { MigrationInterface, QueryRunner } from "typeorm";

export class renameTableColumn1655184383787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table users__registers rename column users__types_id to type_id;`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table users__registers rename column type_id to users__types_id;`)
  }
}
