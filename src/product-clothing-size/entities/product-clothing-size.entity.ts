import { ClothingSize } from 'src/clothing-size/entities/clothing-size.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ProductClothingSize extends CommonEntity {
  @ManyToOne(() => ClothingSize)
  @JoinColumn({ referencedColumnName: 'id' })
  clothingSize: ClothingSize;

  @ManyToOne(() => Product)
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;
}
