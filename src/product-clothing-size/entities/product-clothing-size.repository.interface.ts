import { Repository } from 'typeorm';
import { ProductClothingSize } from './product-clothing-size.entity';

export interface IProductClothingSizeRepository extends Repository<ProductClothingSize> {}
