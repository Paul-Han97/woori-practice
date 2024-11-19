import { Category } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Product extends CommonEntity {
  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  name: string;

  @Column()
  view: number;

  @ManyToOne(() => Category)
  @JoinColumn({ referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => Gender)
  @JoinColumn({ referencedColumnName: 'id' })
  gender: Gender;
}
