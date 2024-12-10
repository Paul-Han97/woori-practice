import { Inject, Injectable, Logger } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants/common-constants';
import { ResponseData } from 'src/common/type/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { IProductImageRepository } from 'src/product-image/entities/product-image.repository.interface';
import { ProductImageRepository } from 'src/product-image/entities/product-image.repository';
import { IProductRepository } from 'src/product/entities/product.repository.interface';
import { ProductRepository } from 'src/product/entities/product.repository';
import { User } from 'src/user/entities/user.entity';
import { DataSource, EntityManager } from 'typeorm';
import { CreateImageDto, UploadImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { ImageRepository } from './entities/image.repository';
import { IImageRepository } from './entities/image.repository.interface';
import { IImageService } from './image.service.interface';

@Injectable()
export class ImageService implements IImageService {
  public static readonly logger = new Logger(ImageService.name);

  constructor(
    @Inject(ProductImageRepository)
    private readonly productImageRepository: IProductImageRepository,

    @Inject(ImageRepository)
    private readonly imageRepository: IImageRepository,

    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,

    private readonly dataSource: DataSource,
    private readonly utilService: UtilService,
  ) {}

  async create(
    createImageDto: CreateImageDto,
    uploadImageDto: UploadImageDto,
    user: User,
  ) {
    ImageService.logger.log('ImageService.create() 시작');

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
        const productImageRepository = manager.withRepository(
          this.productImageRepository,
        );

        const newImage = await manager.save(image);
        await productImageRepository.save(productImage);

        return newImage;
      },
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null,
    };

    ImageService.logger.log(
      'ImageService.create() 시작',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
