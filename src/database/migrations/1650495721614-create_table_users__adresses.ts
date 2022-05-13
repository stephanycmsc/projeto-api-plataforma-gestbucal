import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers_adress1650495721614 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table users__adresses (
        id serial primary key,
        cep varchar(8) not null,
        street varchar(32) not null,
        street_number varchar(32) not null,
        city varchar(20) not null,
        district varchar(20) not null,
        complement varchar(32)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table users__adresses`)
  }
}
