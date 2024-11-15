import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './common/config/config-module-option';
import { typeOrmModuleOptions } from './common/typeorm/datasource';
import { UserModule } from './user/user.module';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { AdminModule } from './admin/admin.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ProductImageModule } from './product-image/product-image.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';


@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    // GlobalEntity,
    // TypeOrmCustomModule.forCustomRepository([UserRepository]),
    UserModule,
    DeliveryAddressModule,
    AdminModule,
    ImageModule,
    CategoryModule,
    SubCategoryModule,
    ProductImageModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
