import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { configModuleOptions } from './common/config/module.option';
import { typeOrmModuleOptions } from './common/typeorm/datasource';
import { UtilModule } from './common/utils/util.module';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { ImageModule } from './image/image.module';
import { OrderModule } from './order/order.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmCustomModule } from './common/typeorm/custom.module';
import { UserRepository } from './user/entities/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    TypeOrmCustomModule.forCustomRepository([UserRepository]),
    // GlobalEntity,
    // TypeOrmCustomModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register({
      // 5분
      ttl: 1000 * 60 * 5
    }),
    UtilModule,
    UserModule,
    DeliveryAddressModule,
    AdminModule,
    ImageModule,
    CategoryModule,
    ProductImageModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
