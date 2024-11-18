import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ClothingSize extends CommonEntity {
  @Column({
    length: 3,
  })
  type: string;
}
