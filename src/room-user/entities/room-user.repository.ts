import { Repository } from 'typeorm';
import { IRoomUserRepository } from './room-user.repository.interface';
import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { RoomUser } from './room-user.entity';

@CustomRepository(RoomUser)
export class RoomUserRepository
  extends Repository<RoomUser>
  implements IRoomUserRepository {}
