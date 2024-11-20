import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CommonUtils } from 'src/common/utils/common.util';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { OrderRepository } from './entities/order.repository';
import { IOrderRepository } from './entities/order.interface';
import { ResponseData } from 'src/common/type/response.type';

@Injectable()
export class OrderService extends CommonUtils {
  public static readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: IOrderRepository,
    private readonly userService: UserService,
  ) {
    super();
  }

  async findByUserId(userId: string, loginUser: User) {
    OrderService.logger.log('OrderService.findByUserId() 시작');
    if (userId !== loginUser.id) {
      throw new BadRequestException(ERROR_MESSAGE.E002);
    }

    const orderList = await this.orderRepository.findByUserId(userId);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: orderList,
    };

    OrderService.logger.log(
      'OrderService.findByUserId() 종료',
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
