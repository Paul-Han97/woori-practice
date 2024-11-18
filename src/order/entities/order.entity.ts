import { CommonEntity } from 'src/common/typeorm/common.entity';
import { OrderState } from 'src/order-state/entities/order-state.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order extends CommonEntity {
  @Column()
  orderDate: Date;

  @ManyToOne(() => OrderState)
  @JoinColumn({ referencedColumnName: 'id' })
  orderState: OrderState;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;
}
