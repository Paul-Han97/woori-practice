import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { GenderRepository } from 'src/gender/entities/gender.repository';
import { ProductClothingSizeRepository } from 'src/product-clothing-size/entities/product-clothing-size.repository';
import { UserRepository } from 'src/user/entities/user.repository';
import { UserService } from 'src/user/user.service';
import { ProductRepository } from './entities/product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      ProductRepository,
      ProductClothingSizeRepository,
      UserRepository,
      GenderRepository,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService, UserService, JwtService],
})
export class ProductModule {}
