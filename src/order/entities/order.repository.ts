import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@CustomRepository(Order)
export class OrderRepository extends Repository<Order> {}
