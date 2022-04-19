import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ID } from '../types'

@Entity({ name: 'users__types' })
export class UsersTypes {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'description', unique: true, length: 32 })
  description: string;
}