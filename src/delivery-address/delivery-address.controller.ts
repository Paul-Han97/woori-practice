import { Body, Controller, Get, Logger, Param, Post, Request } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Auth } from 'src/common/guards/auth.decotrator';
import { DeliveryAddressService } from './delivery-address.service';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';

@Controller('delivery-addresses')
export class DeliveryAddressController {
  public static readonly logger = new Logger(DeliveryAddressController.name);

  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  @ApiOperation({
    summary: `사용자의 배송지를 등록한다.`,
    description: `
    - name: 배송지의 이름을 의미한다.
    - address: 배송지의 주소를 의미한다.
    - rank: 사용자의 배송지 저장 순서를 의미한다.
      - rank의 data type은 serial이므로 자동으로 1씩 증가한다.
      - 사용자를 기준으로 조회했을 때 가장 빠른 rank가 대표 주소이다.`
  })
  @ApiBearerAuth()
  @Auth()
  @Post()
  async create(@Body() createDeliveryAddressDto: CreateDeliveryAddressDto, @Request() req: any) {
    DeliveryAddressController.logger.log('DeliveryAddressController.getByUserId() 시작');
    const result = await this.deliveryAddressService.create(createDeliveryAddressDto, req.user);
    DeliveryAddressController.logger.log('DeliveryAddressController.getByUserId() 종료');
    return result;
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
