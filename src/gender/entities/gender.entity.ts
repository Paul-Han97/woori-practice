import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Gender extends CommonEntity {
  @Column({
    length: 6,
  })
  type: string;

  @OneToMany(() => Product, product => product.gender)
  product:Product[];

  @OneToMany(() => User, user => user.gender)
  user: User[];
}
