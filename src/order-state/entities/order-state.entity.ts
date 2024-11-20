import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class OrderState extends CommonEntity {
  @Column({
    length: 11,
  })
  type: string;

  @OneToMany(() => Order, (order) => order.orderState)
  order: Order[];
}
