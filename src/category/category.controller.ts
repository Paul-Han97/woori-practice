import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ICategoryService } from './category.service.interface';

@Controller('categories')
export class CategoryController {
  public static readonly logger = new Logger(CategoryController.name);

  constructor(
    @Inject(CategoryService)
    private readonly categoryService: ICategoryService) {}

  @ApiOperation({
    summary: '카테고리 전체 조회',
    description: `
    - 카테고리의 메뉴들을 조회한다.`
  })
  @Get()
  async findAll() {
    CategoryController.logger.log('CategoryController.findAll() 시작');
    const result = await this.categoryService.findAll();
    CategoryController.logger.log('CategoryController.findAll() 종료');
    return result;
  }
}
