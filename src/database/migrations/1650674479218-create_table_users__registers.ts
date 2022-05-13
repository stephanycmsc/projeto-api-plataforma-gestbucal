import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers_registers1650674479218 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table users__registers (
        id serial primary key,
        username varchar(32) not null unique,
        email varchar(32) not null unique,
        password varchar(16) not null,
        json_data jsonb not null
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table users__registers`)
  }
}
