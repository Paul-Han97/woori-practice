import { Category } from 'src/category/entities/category.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { ProductClothingSize } from 'src/product-clothing-size/entities/product-clothing-size.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';

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

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  productImage: ProductImage[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProduct: OrderProduct[];

  @OneToMany(
    () => ProductClothingSize,
    (productClothingSize) => productClothingSize.product,
  )
  productClothingSize: ProductClothingSize[];
}
