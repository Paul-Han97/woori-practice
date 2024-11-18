import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Image } from 'src/image/entities/image.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';

@Entity()
export class ProductImage extends CommonEntity {
  @Column()
  rank: number;

  @ManyToOne(() => Product)
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Image)
  @JoinColumn({ referencedColumnName: 'id' })
  image: Image;
}
