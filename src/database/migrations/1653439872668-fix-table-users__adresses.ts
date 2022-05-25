import { MigrationInterface, QueryRunner } from "typeorm";

export class fixTableUsers_adresses1653439872668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses drop column street_number;
      alter table users__adresses rename column cep to zipcod;
      alter table users__adresses alter column zipcod drop not null;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses alter column zipcod set not null;
      alter table users__adresses rename column zipcod to cep;
      alter table users__adresses add column street_number varchar(32) not null;
    `)
  }
}
