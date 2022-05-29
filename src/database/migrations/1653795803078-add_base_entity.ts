import {MigrationInterface, QueryRunner} from "typeorm";

export class addBaseEntity1653795803078 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__types add column created timestamp without time zone not null default now();
      alter table users__types add column deleted timestamp without time zone default null;

      alter table users__registers add column created timestamp without time zone not null default now();
      alter table users__registers add column deleted timestamp without time zone default null;

      alter table users__adresses add column created timestamp without time zone not null default now();
      alter table users__adresses add column deleted timestamp without time zone default null;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__types drop column created;
      alter table users__types drop column deleted;

      alter table users__registers drop column created;
      alter table users__registers drop column deleted;

      alter table users__adresses drop column created;
      alter table users__adresses drop column deleted;
    `)
  }
}
