import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Auth } from 'src/common/guards/auth.decotrator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { IOrderService } from './order.service.interface';

@Controller('orders')
export class OrderController {
  public static readonly logger = new Logger(OrderController.name);

  constructor(
    @Inject(OrderService)
    private readonly orderService: IOrderService,
  ) {}

  @ApiOperation({
    summary: '고객 배송 현황(주문 조회)을 조회한다.',
    description: `
    - 로그인 된 user의 id와 parameter로 요청된 id가 일치해야 한다.
    - orderState의 값은 다음과 같다.
      - PROCESSING: 주문 처리중 또는 작업중
      - IN_DELIVERY: 주문 처리가 완료된 후 배송중
      - COMPLETE: 고객이 상품을 수령
    - price는 금액을 나타낸다.
    - quantity는 수량을 나타낸다.
    - view는 조회수를 나타낸다.`,
  })
  @Auth()
  @ApiBearerAuth()
  @Get('/users/:id')
  async findByUserId(@Param('id') id: string, @Request() req: any) {
    OrderController.logger.log('OrderController.findByUserId() 시작');
    const result = await this.orderService.findByUserId(id, req.user);
    OrderController.logger.log('OrderController.findByUserId() 종료');
    return result;
  }

  @ApiOperation({
    summary: `사용자의 주문한 상품들을 저장한다.`,
    description: `
    - recipient: 수취인을 의미한다.
    - recipientPhone: 수취인의 번호를 의미한다. (총 11자리의 핸드폰 번호를 입력 받으며 DB에 저장시 하이픈(-)은 제거된다.)
    - deliveryAddressId: 사용자가 저장했던 배송지의 id를 의미한다.
    - productList: productId와 count의 배열이다.
      - productId: 사용자가 구매하려는 제품의 id를 의미한다.
      - count: 구매하려는 제품의 수량을 의미한다.
    - count 만큼 product 테이블의 quantity 컬럼을 감한다.`,
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Auth()
  @ApiBearerAuth()
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    OrderController.logger.log('OrderController.create() 시작');
    createOrderDto.recipientPhone = createOrderDto.recipientPhone.replaceAll(
      '-',
      '',
    );
    const result = await this.orderService.create(createOrderDto, req.user);
    OrderController.logger.log('OrderController.create() 종료');
    return result;
  }
}
