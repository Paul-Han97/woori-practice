import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import {
  ERROR_MESSAGE,
  ORDER_STATE_TYPE,
  SUCCESS_MESSAGE,
} from 'src/common/constants/common-constants';
import { ResponseData } from 'src/common/type/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { DeliveryAddress } from 'src/delivery-address/entities/delivery-address.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { IOrderProductRepository } from 'src/order-product/entities/order-product.interface';
import { OrderProductRepository } from 'src/order-product/entities/order-product.repository';
import { OrderState } from 'src/order-state/entities/order-state.entity';
import { IProductRepository } from 'src/product/entities/product.interface';
import { ProductRepository } from 'src/product/entities/product.repository';
import { User } from 'src/user/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { IOrderRepository } from './entities/order.interface';
import { OrderRepository } from './entities/order.repository';

@Injectable()
export class OrderService {
  public static readonly logger = new Logger(OrderService.name);

  constructor(
    @Inject(OrderRepository)
    private readonly orderRepository: IOrderRepository,
    @Inject(OrderProductRepository)
    private readonly orderProductRepository: IOrderProductRepository,
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
    private readonly dataSource: DataSource,
    private readonly utilService: UtilService
  ) {}

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
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async create(createOrderDto: CreateOrderDto, user: User) {
    OrderService.logger.log('OrderService.create() 시작');

    const deliveryAddress = new DeliveryAddress();
    deliveryAddress.id = createOrderDto.deliveryAddressId;

    const orderState = new OrderState();
    orderState.id = this.utilService.uuidGenerator.generate(ORDER_STATE_TYPE.PROCESSING);

    const order = new Order();
    order.recipient = createOrderDto.recipient;
    order.recipientPhone = createOrderDto.recipientPhone;
    order.deliveryAddress = deliveryAddress;
    order.orderState = orderState;
    order.orderDate = new Date();
    order.createdUser = user.id;
    order.user = user;

    await this.dataSource.transaction<Order>(
      async (manager: EntityManager): Promise<Order> => {
        const productRepository = manager.withRepository(
          this.productRepository,
        );

        const orderProductRepository = manager.withRepository(
          this.orderProductRepository,
        );

        const newOrder = await manager.save(order);

        const productList = createOrderDto.productList;
        for (let i = 0; i < productList.length; i++) {
          const product = await this.productRepository.findOneBy({
            id: productList[i].productId,
          });

          if (!product) {
            throw new NotFoundException(ERROR_MESSAGE.E007);
          }

          if (product.quantity - productList[i].count <= 0) {
            throw new BadRequestException(ERROR_MESSAGE.E002);
          }

          product.quantity -= productList[i].count;
          product.updatedUser = user.id;

          await productRepository.save(product);

          const orderProduct = new OrderProduct();
          orderProduct.order = newOrder;
          orderProduct.product = product;
          orderProduct.count = productList[i].count;
          orderProduct.createdUser = user.id;

          await orderProductRepository.save(orderProduct);
        }

        return;
      },
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null,
    };

    OrderService.logger.log(
      'OrderService.create() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
