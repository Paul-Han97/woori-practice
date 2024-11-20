import { CommonEntity } from 'src/common/typeorm/common.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Image extends CommonEntity {
  @Column()
  url: string;

  @OneToMany(() => ProductImage, (productImage) => productImage.image)
  productImage: ProductImage[];
}
