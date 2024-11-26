import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Image } from 'src/image/entities/image.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';

@Entity()
export class ProductImage extends CommonEntity {
  @Column()
  @Generated('increment')
  rank: number;

  @ManyToOne(() => Product, (product) => product.productImage)
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;

  @ManyToOne(() => Image, (image) => image.productImage)
  @JoinColumn({ referencedColumnName: 'id' })
  image: Image;
}
