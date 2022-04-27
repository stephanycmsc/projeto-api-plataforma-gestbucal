import { MigrationInterface, QueryRunner } from "typeorm";

export class createTableUsers_types1650411778877 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE users__types (
        id SERIAL PRIMARY KEY,
        description VARCHAR(32) UNIQUE
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table users__types`)
  }
}   
