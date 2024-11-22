import { Exclude, instanceToPlain } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

const SYSTEM = 'SYSTEM';

export class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column({
    default: SYSTEM,
    nullable: true,
  })
  createdUser: string;

  @Exclude()
  @CreateDateColumn()
  createdDate: Date;

  @Exclude()
  @Column({
    default: SYSTEM,
    nullable: true,
  })
  updatedUser: string;

  @Exclude()
  @UpdateDateColumn()
  updatedDate: Date;

  toJSON() {
    return instanceToPlain(this);
  }
}
