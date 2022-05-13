import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ID } from '../../types'
import { UsersAdresses } from "./UsersAdresses";
import { UsersTypes } from './UsersTypes';

@Entity({ name: 'users__registers' })
export class UsersRegisters {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'username', nullable: false, unique: true, length: 32 })
  username: string;

  @Column({ name: 'email', nullable: false, unique: true, length: 32 })
  email: string;

  @Column({ name: 'password', nullable: false, unique: false, select: false, length: 16 })
  password: string;

  @Column({ name: 'json_data', nullable: false, unique: false, type: 'jsonb' })
  jsonData: JSON;

  @ManyToOne(() => UsersTypes, { nullable: false })
  @JoinColumn({ name: 'users__types_id' })
  usersTypesId: UsersTypes;

  @OneToMany(() => UsersAdresses, address => address.id, { nullable: false })
  @JoinColumn({ name: 'users__address' })
  usersAdresses: UsersAdresses[];
}