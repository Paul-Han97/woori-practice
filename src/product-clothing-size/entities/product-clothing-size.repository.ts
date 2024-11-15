import { CustomRepository } from 'src/common/typeorm/custom-decorator';
import { Repository } from 'typeorm';
import { ProductClothingSize } from './product-clothing-size.entity';

@CustomRepository(ProductClothingSize)
export class ProductClothingSizeRepository extends Repository<ProductClothingSize> {}
