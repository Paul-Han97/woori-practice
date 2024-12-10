import { Repository } from 'typeorm';
import { Room } from './room.entity';

export interface IRoomRepository extends Repository<Room> {}
