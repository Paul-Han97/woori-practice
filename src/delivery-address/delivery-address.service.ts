import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { UpdateDeliveryAddressDto } from './dto/update-delivery-address.dto';
import { CommonUtils } from 'src/common/utils/common.util';
import { ResponseData } from 'src/common/type/response.type';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { DeliveryAddressRepository } from './entities/delivery-address.repository';
import { IDeliveryAddressRepository } from './entities/delivery-address.interface';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DeliveryAddressService extends CommonUtils {
  public static readonly logger = new Logger(DeliveryAddressService.name);

  constructor(
    @Inject(DeliveryAddressRepository)
    private readonly deliveryAddressRepository: IDeliveryAddressRepository,
  ) {
    super();
  }

  create(createDeliveryAddressDto: CreateDeliveryAddressDto) {
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
        rank: 'ASC'
      },
      select: {
        id: true,
        address: true,
        rank: true,
        name: true
      }
    });

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: deliveryAddressList,
    };

    DeliveryAddressService.logger.log(
      `DeliveryAddressService.getByUserId() 종료`,
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
