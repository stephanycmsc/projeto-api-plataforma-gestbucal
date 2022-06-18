import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersRegistersRelation1652418912998 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers add column users__types_id integer not null;
      alter table users__registers add constraint fk_users__registers___users__types foreign key (users__types_id) references users__types(id);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__registers drop constraint fk_users__registers___users__types;
      alter table users__registers drop column users__types_id;
    `)
  }
}
