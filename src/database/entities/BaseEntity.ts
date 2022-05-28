import moment from "moment";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import { ID } from "../../types";

@Entity({ name: 'base_entity' })
export default class BaseEntity {
  @PrimaryGeneratedColumn()
  id: ID;

  @Column({ name: 'created', nullable: false, default: moment().toDate(), unique: false })
  created: Date

  @Column({ name: 'deleted', nullable: true, default: null, unique: false })
  deleted: Date
}