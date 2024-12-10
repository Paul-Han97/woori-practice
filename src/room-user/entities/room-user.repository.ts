import { Repository } from 'typeorm';
import { IRoomRepository } from './room-user.interface';
import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { RoomUser } from './room-user.entity';

@CustomRepository(RoomUser)
export class RoomRepository
  extends Repository<RoomUser>
  implements IRoomRepository {}
