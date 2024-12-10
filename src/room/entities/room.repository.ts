import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { IRoomRepository } from './room.interface';
import { CustomRepository } from 'src/common/typeorm/custom.decorator';

@CustomRepository(Room)
export class RoomRepository
  extends Repository<Room>
  implements IRoomRepository {}
