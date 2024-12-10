import { Controller, Get, Inject, Logger, Param, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GetProductFilterDto } from './dto/get-product-filter.dto';
import { ProductService } from './product.service';
import { IProductService } from './product.service.interface';

@Controller('products')
export class ProductController {
  public static readonly logger = new Logger(ProductController.name);

  constructor(
    @Inject(ProductService)
    private readonly productService: IProductService) {}

  @ApiOperation({
    summary: `조회수를 기준으로 상위 3개의 제품을 조회한다.`,
    description: `
    - 조회수를 기준으로 상위 3개의 제품을 조회한다.
    - body.data의 0번 인덱스의 데이터가 조회수 1등의 데이터이다.`,
  })
  @ApiOkResponse({
    example: {
      body: {
        status: 'OK',
        message: '요청이 성공적으로 완료 되었습니다.',
        data: [
          {
            id: 'f13b2c44-3ee0-44e1-bd5b-0529eb36c9f3',
            price: 290000,
            quantity: 19,
            name: '하의_의류10',
            view: 100,
            gender: {
              id: '90870a34-1c11-5881-9844-e8807eee9764',
              type: 'FEMALE',
            },
            category: {
              id: '965e00e4-783a-4c82-ac74-3e6d999abb26',
              name: '하의',
            },
          },
          {
            id: '9e373e1d-868e-4f09-a00d-59140c54cfe7',
            price: 380000,
            quantity: 48,
            name: '아우터_의류9',
            view: 40,
            gender: {
              id: '90870a34-1c11-5881-9844-e8807eee9764',
              type: 'FEMALE',
            },
            category: {
              id: '48f1efa3-681c-4d2f-a470-936d7c74f5a7',
              name: '아우터',
            },
          },
          {
            id: '9965bd62-4cc1-4fcb-9314-2ae219ae4916',
            price: 370000,
            quantity: 47,
            name: '아우터_의류8',
            view: 38,
            gender: {
              id: '90870a34-1c11-5881-9844-e8807eee9764',
              type: 'FEMALE',
            },
            category: {
              id: '48f1efa3-681c-4d2f-a470-936d7c74f5a7',
              name: '아우터',
            },
          },
        ],
      },
    },
  })
  @Get()
  async getRankedProducts() {
    ProductController.logger.log('ProductController.getRankedProducts() 시작');
    const result = await this.productService.getRankedProductList();
    ProductController.logger.log('ProductController.getRankedProducts() 종료');
    return result;
  }

  @ApiOperation({
    summary: `해당 카테고리의 제품을 조회한다.`,
    description: `
    - categoryId를 parameter로 받아 조회한다.
    - page와 take를 queryString으로 받아 조회한다.
      - page: 현재 페이지 번호 (기본 값: 1)
      - take: 한 페이지당 표시할 제품 수 (기본 값: 9)`,
  })
  @Get('categories/:categoryId')
  async getByCategoryId(
    @Param('categoryId') categoryId: string,
    @Query() getProductFilterDto: GetProductFilterDto,
  ) {
    ProductController.logger.log('ProductController.getByCategoryId() 시작');

    const result = await this.productService.getByCategoryId(
      categoryId,
      getProductFilterDto,
    );
    ProductController.logger.log('ProductController.getByCategoryId() 종료');
    return result;
  }

  @ApiOperation({
    summary: `1개의 제품을 조회한다.`,
    description: `
    - id를 parameter로 받아 조회한다.
    - price: 제품의 가격을 의미한다.
    - quantity: 제품의 수량을 의미한다.
    - name: 제품의 이름을 의미한다.
    - gender.type: 남성 또는 여성을 의미한다. (MALE | FEMALE)
    - clothingSize.type: 제품의 크기를 의미한다. (XS | S | M | L | XL | XXL)`,
  })
  @ApiNotFoundResponse({
    description: '제품 조회가 안됐을 때 발생하는 응답'
  })
  @Get(':id')
  async getById(@Param('id') id: string) {
    ProductController.logger.log('ProductController.getById() 시작');
    const result = await this.productService.getById(id);
    ProductController.logger.log('ProductController.getById() 종료');
    return result;
  }
}
