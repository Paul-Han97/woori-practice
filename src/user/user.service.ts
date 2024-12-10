import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { ResponseData } from 'src/common/type/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { Gender } from 'src/gender/entities/gender.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { IUserRepository } from './entities/user.repository.interface';
import { IUserService } from './user.service.interface';

@Injectable()
export class UserService implements IUserService {
  public static readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly utilService: UtilService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseData> {
    UserService.logger.log(`UserService.create() 시작`);

    const savedUser = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (savedUser) {
      throw new BadRequestException(ERROR_MESSAGE.E004);
    }

    const gender = new Gender();
    gender.id = this.utilService.uuidGenerator.generate(createUserDto.gender);

    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = await this.utilService.passwordManager.hash(
      createUserDto.password,
    );
    user.gender = gender;

    await this.userRepository.save(user);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S001,
      data: null,
    };

    UserService.logger.log(
      `UserService.create() 종료`,
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async findByEmail(getUserDto: GetUserDto): Promise<ResponseData> {
    UserService.logger.log(`UserService.findByEmail() 시작`);

    if (!getUserDto.email) {
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
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async findOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }
}
