import { Repository } from 'typeorm';
import { IRoomRepository } from './chat.interface';
import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Chat } from './chat.entity';

@CustomRepository(Chat)
export class RoomRepository
  extends Repository<Chat>
  implements IRoomRepository {}
