import { Module } from '@nestjs/common';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { DeliveryAddressRepository } from './entities/delivery-address.repository';
import { UserRepository } from 'src/user/entities/user.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([DeliveryAddressRepository, UserRepository])],
  controllers: [DeliveryAddressController],
  providers: [DeliveryAddressService, UserService],
})
export class DeliveryAddressModule {}
