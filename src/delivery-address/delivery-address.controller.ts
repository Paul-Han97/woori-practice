import { Body, Controller, Get, Logger, Param, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/guards/auth.decotrator';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';

@Controller('delivery-address')
export class DeliveryAddressController {
  public static readonly logger = new Logger(DeliveryAddressController.name);

  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @Post()
  create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto) {
    return this.deliveryAddressService.create(createDeliveryAddressDto);
  }

  @ApiOperation({
    summary: `사용자의 배송지를 조회한다.`,
    description: `
    - userId를 parameter로 받아 배송지를 조회한다.
    - userId와 로그인된 user의 id가 같아야 조회가 가능하다.
    - 배송지가 삽입될 때 rank 순서로 삽입되기 때문에 해당 컬럼 값으로 정렬한다.`
  })
  @ApiBadRequestResponse({
    description: 'userId와 로그인된 user의 id가 다르면 발생하는 응답이다.'
  })
  @ApiBearerAuth()
  @Auth()
  @Get('users/:userId')
  async getByUserId(@Param('userId') userId: string, @Request() req: any) {
    DeliveryAddressController.logger.log('DeliveryAddressController.getByUserId() 시작');
    const result = await this.deliveryAddressService.getByUserId(userId, req.user);
    DeliveryAddressController.logger.log('DeliveryAddressController.getByUserId() 종료');
    return result;
  }
}
