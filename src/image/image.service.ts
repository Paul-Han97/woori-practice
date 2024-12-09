import { Inject, Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { ProductRepository } from 'src/product/entities/product.repository';
import { IProductRepository } from 'src/product/entities/product.interface';
import { CreateImageDto, UploadImageDto } from './dto/create-image.dto';
import { User } from 'src/user/entities/user.entity';
import { ImageRepository } from './entities/image.repository';
import { IImageRepository } from './entities/image.interface';
import { ProductImageRepository } from 'src/product-image/entities/product-image.repository';
import { IProductImageRepository } from 'src/product-image/entities/product-image.interface';
import { DataSource, EntityManager } from 'typeorm';
import { ResponseData } from 'src/common/type/response.type';
import { SUCCESS_MESSAGE } from 'src/common/constants/common-constants';

@Injectable()
export class ImageService {
  constructor(
    @Inject(ProductImageRepository)
    private readonly productImageRepository: IProductImageRepository,

    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,

    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,

    private readonly dataSource: DataSource
  ) {}

  async create(
    createImageDto: CreateImageDto,
    uploadImageDto: UploadImageDto,
    user: User,
  ) {
    const product = await this.productRepository.findById(
      createImageDto.productId,
    );

    const image = new Image();
    image.url = uploadImageDto.filename;
    // image.ext =
    image.createdUser = user.id;

    const productImage = new ProductImage();
    productImage.image = image;
    productImage.product = product;
    productImage.createdUser = user.id;

    await this.dataSource.transaction<Image>(
      async (manager: EntityManager): Promise<Image> => {
        const productImageRepository = manager.withRepository(this.productImageRepository);

        const newImage = await manager.save(image);
        await productImageRepository.save(productImage);

        return newImage;
      }
    )

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null
    }

    return resData;
  }
}
