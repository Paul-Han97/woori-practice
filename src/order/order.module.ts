import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { OrderRepository } from './entities/order.repository';
import { UserRepository } from 'src/user/entities/user.repository';
import { OrderProductRepository } from 'src/order-product/entities/order-product.repository';
import { ProductRepository } from 'src/product/entities/product.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([OrderRepository, UserRepository, OrderProductRepository, ProductRepository])],
  controllers: [OrderController],
  providers: [OrderService, UserService],
})
export class OrderModule {}
