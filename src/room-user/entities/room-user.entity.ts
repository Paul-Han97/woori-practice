import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Room } from 'src/room/entities/room.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RoomUser extends CommonEntity {
  @ManyToOne(() => Room)
  @JoinColumn({ referencedColumnName: 'id' })
  room: Room;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;
}
