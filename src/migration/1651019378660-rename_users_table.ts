import {MigrationInterface, QueryRunner} from "typeorm";

export class renameUsersTable1651019378660 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE users__users ADD json_data JSONB NOT NULL;
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE users__users DROP COLUMN json_data;
    `)
    }

}
