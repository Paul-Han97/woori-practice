import { Exclude } from 'class-transformer';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { DeliveryAddress } from 'src/delivery-address/entities/delivery-address.entity';
import { Gender } from 'src/gender/entities/gender.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User extends CommonEntity {
  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @ManyToOne(() => Gender)
  @JoinColumn({ referencedColumnName: 'id' })
  gender: Gender;

  @OneToMany(() => DeliveryAddress, (deliveryAddress) => deliveryAddress.user)
  deliveryAddress: DeliveryAddress[];
}
