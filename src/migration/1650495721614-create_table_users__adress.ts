import {MigrationInterface, QueryRunner} from "typeorm";

export class createTableUsers_adress1650495721614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            create table users__adress (
                id serial PRIMARY KEY,
                cep varchar(8) NOT NULL,
                street varchar(32) NOT NULL,
                street_number varchar(32) NOT NULL,
                city varchar(20) NOT NULL,
                district varchar(20) NOT NULL,
                complement varchar(32)
                )
            `)
        }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table users__adress`)
    }
}
