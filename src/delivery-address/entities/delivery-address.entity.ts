import { CommonEntity } from "src/common/typeorm/common.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class DeliveryAddress extends CommonEntity {
    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    @Generated('increment')
    rank: number;

    @ManyToOne(() => User)
    @JoinColumn({ referencedColumnName: 'id' })
    user: User;
}
