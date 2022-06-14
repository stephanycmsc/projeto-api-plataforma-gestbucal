import UsersRegisters from "./UsersRegisters";
import BaseEntity from "./BaseEntity";
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";

@Entity({ name: 'users__adresses' })
export default class UsersAdresses extends BaseEntity {
  @Column({ name: 'zipcode', nullable: true, default: null, unique: false, length: 9 })
  zipcode: string;

  @Column({ name: 'street', nullable: false, unique: false, length: 32 })
  street: string;

  @Column({ name: 'city', nullable: false, unique: false, length: 20 })
  city: string;

  @Column({ name: 'district', nullable: false, unique: false, length: 20 })
  district: string;

  @Column({ name: 'complement', nullable: true, unique: false, length: 32 })
  complement: string;

  @ManyToOne(() => UsersRegisters, { nullable: false, cascade: ['insert', 'soft-remove', 'update'] })
  @JoinColumn({ name: 'users__registers_id' })
  usersRegistersId: UsersRegisters;
}