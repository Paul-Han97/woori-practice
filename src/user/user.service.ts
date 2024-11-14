import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gender } from 'src/gender/gender.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { IUserRepository } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log('create');
    // const gender = await this.genderRepository.findOneBy({type: createUserDto.gender});
    const gender = new Gender();
    gender.type = '남자';

    const user = new User();
    console.log('asdfasdfasdf')
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.gender = gender;

    console.log(this.userRepository);
    const result = await this.userRepository.testSave(user)
    return result;
  }

  findAll() {
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
