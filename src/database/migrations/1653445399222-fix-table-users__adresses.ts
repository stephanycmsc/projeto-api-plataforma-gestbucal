import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTableUsers_adresses1653445399222 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses rename column zipcod to zipcode;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses rename column zipcode to zipcod;
    `)
  }
}
