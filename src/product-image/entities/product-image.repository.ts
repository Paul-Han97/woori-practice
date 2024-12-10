import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { ProductImage } from './product-image.entity';
import { IProductImageRepository } from './product-image.repository.interface';

@CustomRepository(ProductImage)
export class ProductImageRepository
  extends Repository<ProductImage>
  implements IProductImageRepository {}
