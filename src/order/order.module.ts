import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { OrderRepository } from './entities/order.repository';
import { UserRepository } from 'src/user/entities/user.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([OrderRepository, UserRepository])],
  controllers: [OrderController],
  providers: [OrderService, UserService],
})
export class OrderModule {}
