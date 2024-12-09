import { Module } from '@nestjs/common';
import { AwsModule } from 'src/aws/aws.module';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { ProductImageRepository } from 'src/product-image/entities/product-image.repository';
import { ProductRepository } from 'src/product/entities/product.repository';
import { ImageRepository } from './entities/image.repository';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/entities/user.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([ImageRepository, ProductImageRepository, ProductRepository, UserRepository]),
    AwsModule,
  ],
  controllers: [ImageController],
  providers: [ImageService, UserService],
})
export class ImageModule {}
