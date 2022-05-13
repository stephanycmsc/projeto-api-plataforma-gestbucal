import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ID } from '../../types'
import { UsersRegisters } from "./UsersRegisters";

@Entity({ name: 'users__adresses' })
export class UsersAdresses {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'cep', nullable: false, unique: false, length: 8 })
  cep: string;

  @Column({ name: 'street', nullable: false, unique: false, length: 32 })
  street: string;

  @Column({ name: 'street_number', nullable: false, unique: false, length: 32 })
  street_number: string;

  @Column({ name: 'city', nullable: false, unique: false, length: 20 })
  city: string;

  @Column({ name: 'district', nullable: false, unique: false, length: 20 })
  district: string;

  @Column({ name: 'complement', nullable: true, unique: false, length: 32 })
  complement: string;

  @ManyToOne(() => UsersRegisters, { nullable: false })
  @JoinColumn({ name: 'users__registers_id' })
  usersRegistersId: UsersRegisters;
}