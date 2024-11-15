import { Repository } from 'typeorm';
import { Order } from './order.entity';

export interface IOrderRepository extends Repository<Order> {}
