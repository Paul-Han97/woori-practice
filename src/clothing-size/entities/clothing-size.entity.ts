import { CommonEntity } from 'src/common/typeorm/common.entity';
import { ProductClothingSize } from 'src/product-clothing-size/entities/product-clothing-size.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class ClothingSize extends CommonEntity {
  @Column({
    length: 3,
  })
  type: string;

  @OneToMany(
    () => ProductClothingSize,
    (productClothingSize) => productClothingSize.clothingSize,
  )
  productClothingSize: ProductClothingSize[];
}
