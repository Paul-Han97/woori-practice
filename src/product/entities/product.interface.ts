import { Repository } from 'typeorm';
import { Product } from './product.entity';

export interface IProductRepository extends Repository<Product> {}
