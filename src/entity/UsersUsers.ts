import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ID } from '../types'
import { UsersAddress } from "./UsersAddress";
import { UsersTypes } from './UsersTypes';

@Entity({ name: 'users__users' })
export class UsersUsers {
  @PrimaryGeneratedColumn()
  id: ID;

  @OneToMany(() => UsersAddress, address => address.id) @JoinColumn({name: 'users__address_id'})
  usersAddressId: UsersAddress[];

  @ManyToOne(() => UsersTypes) @JoinColumn({name: 'users__types_id'})
  usersTypes: UsersTypes;

  @Column({ name: 'username', unique: true, length: 32 })
  username: string;

  @Column({ name: 'email', unique: true, length: 32 })
  email: string;

  @Column({ name: 'password', length: 16 })
  password: string;

  @Column({ name: 'json_data', type: 'jsonb'})
  jsonData: JSON;

}