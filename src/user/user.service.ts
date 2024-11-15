import { Inject, Injectable } from '@nestjs/common';
import { UuidTransformer } from 'src/common/utils/uuid.util';
import { IGenderRepository } from 'src/gender/entities/gender.interface';
import { GenderRepository } from 'src/gender/entities/gender.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './entities/user.repository';
import { IUserRepository } from './entities/user.interface';
import { User } from './entities/user.entity';
import { GENDER_TYPE } from 'src/common/constants/common-constants';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,

    @Inject(GenderRepository)
    private readonly genderRepository: IGenderRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('create');
    const gender = await this.genderRepository.findOneBy({type: createUserDto.gender});
    // const gender = new Gender();
    // gender.type = '남자';

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.gender = gender;

    const result = await this.userRepository.testSave(user)
    return result;
  }

  findAll() {
    const uuid = new UuidTransformer().toUuid(GENDER_TYPE.MALE)
    console.log(uuid);
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
