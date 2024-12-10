import { Chat } from 'src/chat/entities/chat.entity';
import { CommonEntity } from 'src/common/typeorm/common.entity';
import { RoomUser } from 'src/room-user/entities/room-user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Room extends CommonEntity {
  @Column()
  name: string;

  @OneToMany(() => Chat, (chat) => chat.room)
  chat: Chat[];

  @OneToMany(() => RoomUser, (roomUser) => roomUser.room)
  roomUser: RoomUser[];
}
