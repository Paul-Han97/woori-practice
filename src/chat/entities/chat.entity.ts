import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Chat extends CommonEntity {
  @Column({ default: Date.now() })
  sendDate: Date;

  @Column()
  message: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  sender: User;

  @ManyToOne(() => Room)
  @JoinColumn({ referencedColumnName: 'id' })
  room: Room;
}
