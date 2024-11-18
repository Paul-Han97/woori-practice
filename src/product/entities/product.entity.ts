import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
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

  @ManyToOne(() => SubCategory)
  @JoinColumn({ referencedColumnName: 'id' })
  subCategory: SubCategory;

  @ManyToOne(() => Gender)
  @JoinColumn({ referencedColumnName: 'id' })
  gender: Gender;
}
