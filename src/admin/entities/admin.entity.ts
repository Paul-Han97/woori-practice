import { CommonEntity } from 'src/common/typeorm/common-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends CommonEntity {
  @Column()
  username: string;

  @Column()
  password: string;
}
