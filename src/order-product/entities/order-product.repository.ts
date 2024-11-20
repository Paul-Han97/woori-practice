import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { OrderProduct } from './order-product.entity';

@CustomRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct> {}
