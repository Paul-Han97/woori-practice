import { CustomRepository } from 'src/common/typeorm/custom-decorator';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@CustomRepository(Product)
export class ProductRepository extends Repository<Product> {}
