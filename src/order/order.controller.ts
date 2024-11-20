import {
  Controller,
  Get,
  Logger,
  Param,
  Request
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/guards/auth.decotrator';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  public static readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) {}

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
    - view는 조회수를 나타낸다.`
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
}
