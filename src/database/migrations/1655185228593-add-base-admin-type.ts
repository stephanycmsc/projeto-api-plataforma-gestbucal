import { MigrationInterface, QueryRunner } from "typeorm";

export class addBaseAdminType1655185228593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`insert into users__types ("description") values ('admin');`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from users__types where description = 'admin';`)
  }
}
