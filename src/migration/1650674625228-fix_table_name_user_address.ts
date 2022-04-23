import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTableNameUserAddress1650674111126 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adress rename to users__address;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__address rename to users__adress;
    `)
  }
}
