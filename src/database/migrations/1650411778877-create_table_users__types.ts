import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers_types1650411778877 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create table users__types (
        id serial primary key,
        description varchar(32) not null unique
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table users__types`)
  }
}   
