import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ID } from '../types'

@Entity({ name: 'users__address' })
export class UsersAddress {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'cep', unique: false, length: 8, nullable: false })
  cep: string;

  @Column({ name: 'street', unique: false, length: 32, nullable: false })
  street: string;

  @Column({ name: 'street_number', unique: false, length: 32, nullable: false })
  street_number: string;

  @Column({ name: 'city', unique: false, length: 20, nullable: false })
  city: string;

  @Column({ name: 'district', unique: false, length: 20, nullable: false })
  district: string;

  @Column({ name: 'complement', unique: false, length: 32, nullable: true })
  complement: string;
}