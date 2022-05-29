import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTable1653850838697 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers alter column password type varchar(256)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers alter column password type varchar(16)
    `)
  }
}
