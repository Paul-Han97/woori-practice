import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';

@CustomRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository {}
