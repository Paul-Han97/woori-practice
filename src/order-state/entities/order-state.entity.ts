import { CommonEntity } from 'src/common/typeorm/common-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class OrderState extends CommonEntity {
  @Column({
    length: 11,
  })
  type: string;
}
