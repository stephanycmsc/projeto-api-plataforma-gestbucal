import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ID } from '../types'

@Entity({ name: 'users__address' })
export class UsersAddress {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'cep', unique: false, length: 8 })
  cep: string;

  @Column({ name: 'street', unique: false, length: 32 })
  street: string;

  @Column({ name: 'street_numberr', unique: false, length: 32 })
  street_number: string;

  @Column({ name: 'city', unique: false, length: 20 })
  city: string;

  @Column({ name: 'district', unique: false, length: 20 })
  district: string;

  @Column({ name: 'complement', unique: false, length: 32 })
  complement: string;
}