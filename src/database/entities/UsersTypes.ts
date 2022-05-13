import { register } from "ts-node";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { ID } from '../../types'
import { UsersRegisters } from "./UsersRegisters";

@Entity({ name: 'users__types' })
export class UsersTypes {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'description', nullable: false, unique: true, length: 32 })
  description: string;

  @OneToMany(() => UsersRegisters, register => register.id)
  @JoinColumn({ name: 'users__registers' })
  usersRegisters: UsersRegisters[];
}