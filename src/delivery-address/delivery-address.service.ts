import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { UtilService } from 'src/common/utils/util.service';
import { ResponseData } from 'src/common/type/response.type';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { DeliveryAddressRepository } from './entities/delivery-address.repository';
import { IDeliveryAddressRepository } from './entities/delivery-address.interface';
import { User } from 'src/user/entities/user.entity';
import { DeliveryAddress } from './entities/delivery-address.entity';

@Injectable()
export class DeliveryAddressService {
  public static readonly logger = new Logger(DeliveryAddressService.name);

  constructor(
    @Inject(DeliveryAddressRepository)
    private readonly deliveryAddressRepository: IDeliveryAddressRepository,
    private readonly utilService: UtilService,
  ) {}

  async create(createDeliveryAddressDto: CreateDeliveryAddressDto, user: User) {
    DeliveryAddressService.logger.log('DeliveryAddressService.create() 시작');
    const newDeliveryAddress = new DeliveryAddress();
    newDeliveryAddress.address = createDeliveryAddressDto.address;
    newDeliveryAddress.name = createDeliveryAddressDto.name;
    newDeliveryAddress.user = user;
    newDeliveryAddress.createdUser = user.id;

    await this.deliveryAddressRepository.save(newDeliveryAddress);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null,
    };

    DeliveryAddressService.logger.log(
      'DeliveryAddressService.create() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return 'This action adds a new deliveryAddress';
  }

  async getByUserId(userId: string, user: User) {
    DeliveryAddressService.logger.log(
      'DeliveryAddressService.getByUserId() 시작',
    );

    if (userId !== user.id) {
      throw new BadRequestException(ERROR_MESSAGE.E002);
    }

    const deliveryAddressList = await this.deliveryAddressRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      order: {
        rank: 'ASC',
      }
    });

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: deliveryAddressList,
    };

    DeliveryAddressService.logger.log(
      `DeliveryAddressService.getByUserId() 종료`,
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
