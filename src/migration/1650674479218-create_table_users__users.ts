import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUsers_users1650674479218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE users__users (
        id SERIAL PRIMARY KEY,
        users__address_id SERIAL,
        users__types_id SERIAL,
        username VARCHAR(32) NOT NULL UNIQUE,
        email VARCHAR(32) NOT NULL UNIQUE,
        password VARCHAR(16) NOT NULL,
        FOREIGN KEY (users__address_id) REFERENCES users__address(id),
        FOREIGN KEY (users__types_id) REFERENCES users__types(id)
      )
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table users__users`)
    }

}
