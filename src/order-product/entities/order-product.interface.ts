import { Repository } from 'typeorm';
import { OrderProduct } from './order-product.entity';

export interface IOrderProductRepository extends Repository<OrderProduct> {}
