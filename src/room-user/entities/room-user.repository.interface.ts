import { Repository } from 'typeorm';
import { RoomUser } from './room-user.entity';

export interface IRoomUserRepository extends Repository<RoomUser> {}
