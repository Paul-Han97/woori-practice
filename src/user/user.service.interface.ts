import { ResponseData } from 'src/common/type/response.type';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';

export interface IUserService {
  create(createUserDto: CreateUserDto): Promise<ResponseData>;
  findByEmail(getUserDto: GetUserDto): Promise<ResponseData>;
  findOne(id: string): Promise<User>;
}
