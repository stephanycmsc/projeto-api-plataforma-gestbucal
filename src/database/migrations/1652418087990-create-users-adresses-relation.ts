import { MigrationInterface, QueryRunner } from "typeorm";

export class createUsersAdressesRelation1652418087990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses add column users__registers_id int not null;
      alter table users__adresses add constraint fk_users__adresses___users__registers foreign key (users__registers_id) references users__registers(id);
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      alter table users__adresses drop constraint fk_users__adresses___users__registers;
      alter table users__adresses drop column users__registers_id;
    `)
  }
}
