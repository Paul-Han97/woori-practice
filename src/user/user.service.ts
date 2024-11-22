import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ERROR_MESSAGE,
  GENDER_TYPE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { CommonUtils } from 'src/common/utils/common.util';
import { UuidGenerator } from 'src/common/utils/uuid-generator.util';
import { Gender } from 'src/gender/entities/gender.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './entities/user.interface';
import { UserRepository } from './entities/user.repository';
import { ResponseBody, ResponseData } from 'src/common/type/response.type';

@Injectable()
export class UserService extends CommonUtils {
  public static readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    // private readonly uuidGenerator: UuidGenerator,
    // private readonly passwordManager: PasswordManager,
    // private readonly objectFormatter: ObjectFormatter,
  ) {
    super();
  }

  async create(createUserDto: CreateUserDto) {
    UserService.logger.log(`UserService.create() 시작`);

    const savedUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (savedUser) {
      throw new BadRequestException(ERROR_MESSAGE.E004);
    }

    const gender = new Gender();
    gender.id = this.uuidGenerator.generate(createUserDto.gender);

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await this.passwordManager.hash(createUserDto.password);
    user.gender = gender;

    await this.userRepository.save(user);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S001,
      data: null,
    };

    UserService.logger.log(
      `UserService.create() 종료`,
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async findByEmail(getUserDto: GetUserDto) {
    UserService.logger.log(`UserService.findByEmail() 시작`);

    if(!getUserDto.email) { 
      throw new BadRequestException(ERROR_MESSAGE.E002);
    }

    const result = await this.userRepository.findOneBy({
      email: getUserDto.email,
    });

    if (!result) {
      throw new NotFoundException(ERROR_MESSAGE.E001);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S002,
      data: result,
    };

    UserService.logger.log(
      `UserService.findByEmail() 종료`,
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  findAll() {
    const uuid = new UuidGenerator().generate(GENDER_TYPE.MALE);
    console.log(uuid);
    return `This action returns all user`;
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
