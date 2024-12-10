import { Inject, Injectable, Logger } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants/common-constants';
import { ResponseData } from 'src/common/type/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { ICategoryRepository } from './entities/category.repository.interface';
import { CategoryRepository } from './entities/category.repository';
import { ICategoryService } from './category.service.interface';

@Injectable()
export class CategoryService implements ICategoryService {
  public static readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
    private readonly utilService: UtilService
  ) {}

  async findAll() {
    CategoryService.logger.log('CategoryService.findAll() 시작');
    const categoryList = await this.categoryRepository.find();

    const categoryFormat = categoryList.map((category) => {
      const data = {
        id: category.id,
        name: category.name
      }
      return data;
    });
    
    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: categoryFormat,
    };
    
    CategoryService.logger.log(
      'CategoryService.findAll() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
