import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { IOrderRepository } from './order.repository.interface';

@CustomRepository(Order)
export class OrderRepository
  extends Repository<Order>
  implements IOrderRepository
{
  async findByUserId(userId: string): Promise<Order[]> {
    const orderList = await this.createQueryBuilder('order')
      .leftJoinAndSelect('order.orderState', 'orderState')
      .leftJoinAndSelect('order.orderProduct', 'orderProduct')
      .leftJoinAndSelect('orderProduct.product', 'product')
      .where('order.userId = :userId', { userId })
      .getMany();
    return orderList;
  }
}
