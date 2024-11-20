import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { GetProductFilterDto } from '../dto/get-product-filter.dto';

export interface IProductRepository extends Repository<Product> {
  findRankedProduct(): Promise<Product[]>;
  findByCategoryId(categoryId: string, getProductFilterDto: GetProductFilterDto): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}
