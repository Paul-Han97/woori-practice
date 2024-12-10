import { Repository } from 'typeorm';
import { Chat } from './chat.entity';


export interface IRoomRepository extends Repository<Chat> {}
