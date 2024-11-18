import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class OrderProduct extends CommonEntity {
  @ManyToOne(() => Order)
  @JoinColumn({ referencedColumnName: 'id' })
  order: Order;

  @ManyToOne(() => Product)
  @JoinColumn({ referencedColumnName: 'id' })
  product: Product;
}
