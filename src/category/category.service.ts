import { Inject, Injectable, Logger } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants/common-constants';
import { ResponseData } from 'src/common/type/response.type';
import { CommonUtils } from 'src/common/utils/common.util';
import { ICategoryRepository } from './entities/category.interface';
import { CategoryRepository } from './entities/category.repository';

@Injectable()
export class CategoryService extends CommonUtils {
  public static readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject(CategoryRepository)
    private readonly categoryRepository: ICategoryRepository,
  ) {
    super();
  }

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
      `반환 값:\n${this.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
