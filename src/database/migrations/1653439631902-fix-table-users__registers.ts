import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTableUsers_registers1653439631902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers alter column email type varchar(64)
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers alter column email type varchar(32)
    `)
  }
}
