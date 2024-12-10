import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';
import { IRoomRepository } from './chat.repository.interface';

@CustomRepository(Chat)
export class RoomRepository
  extends Repository<Chat>
  implements IRoomRepository {}
