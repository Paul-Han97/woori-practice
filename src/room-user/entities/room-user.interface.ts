import { Repository } from 'typeorm';
import { RoomUser } from './room-user.entity';

export interface IRoomRepository extends Repository<RoomUser> {}
