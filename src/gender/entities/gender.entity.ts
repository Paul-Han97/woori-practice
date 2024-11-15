import { CommonEntity } from 'src/common/typeorm/common-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Gender extends CommonEntity {
  @Column({
    length: 6,
  })
  type: string;
}
