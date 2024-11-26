import { CommonEntity } from 'src/common/typeorm/common.entity';
import { DeliveryAddress } from 'src/delivery-address/entities/delivery-address.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { OrderState } from 'src/order-state/entities/order-state.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Order extends CommonEntity {
  @Column()
  orderDate: Date;

  @Column()
  recipient: string;

  @Column()
  recipientPhone: string;

  @ManyToOne(() => OrderState)
  @JoinColumn({ referencedColumnName: 'id' })
  orderState: OrderState;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => DeliveryAddress)
  @JoinColumn({ referencedColumnName: 'id' })
  deliveryAddress: DeliveryAddress;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct: OrderProduct[];
}
