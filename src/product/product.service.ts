import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './entities/product.repository';
import { IProductRepository } from './entities/product.interface';
import { ResponseData } from 'src/common/type/response.type';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants/common-constants';
import { CommonUtils } from 'src/common/utils/common.util';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

@Injectable()
export class ProductService extends CommonUtils {
  public static readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject(ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {
    super();
  }
  async getRankedProductList() {
    ProductService.logger.log('ProductService.getRankedProductList() 시작');
    const rankedProductList = await this.productRepository.findRankedProduct();

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: rankedProductList,
    };

    ProductService.logger.log(
      'ProductService.getRankedProductList() 종료',
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async getByCategoryId(
    categoryId: string,
    getProductFilterDto: GetProductFilterDto,
  ) {
    ProductService.logger.log('ProductService.getByCategoryId() 시작');
    const productList = await this.productRepository.findByCategoryId(
      categoryId,
      getProductFilterDto,
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: productList,
    };

    ProductService.logger.log(
      'ProductService.getByCategoryId() 종료',
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async getById(id: string) {
    ProductService.logger.log('ProductService.getById() 시작');
    const product = await this.productRepository.findById(id);

    if(!product) {
      throw new NotFoundException(ERROR_MESSAGE.E007);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: product,
    };

    ProductService.logger.log('ProductService.getById() 종료');
    return resData;
  }
}
