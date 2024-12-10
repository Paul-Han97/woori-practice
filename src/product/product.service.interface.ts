import { ResponseData } from 'src/common/type/response.type';
import { GetProductFilterDto } from './dto/get-product-filter.dto';

export interface IProductService {
  getRankedProductList(): Promise<ResponseData>;
  getByCategoryId(
    categoryId: string,
    getProductFilterDto: GetProductFilterDto,
  ): Promise<ResponseData>;
  getById(id: string): Promise<ResponseData>;
}
