import { CustomRepository } from 'src/common/typeorm/custom.decorator';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { IProductRepository } from './product.interface';
import { take } from 'rxjs';
import { GetProductFilterDto } from '../dto/get-product-filter.dto';

@CustomRepository(Product)
export class ProductRepository
  extends Repository<Product>
  implements IProductRepository
{
  async findRankedProduct(): Promise<Product[]> {
    const reuslt = await this.createQueryBuilder('product')
      .select([
        'product.id',
        'product.view',
        'product.price',
        'product.quantity',
        'product.name',
        'gender.id',
        'gender.type',
        'category.id',
        'category.name',
      ])
      .leftJoin('product.gender', 'gender')
      .leftJoin('product.category', 'category')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .leftJoinAndSelect('productImage.image', 'image')
      .orderBy('product.view', 'DESC')
      .take(3)
      .getMany();
    return reuslt;
  }

  async findByCategoryId(
    categoryId: string,
    getProductFilterDto: GetProductFilterDto,
  ): Promise<Product[]> {
    const take = Number(getProductFilterDto.take);
    const page = (Number(getProductFilterDto.page) - 1) * take;

    const productList = await this.createQueryBuilder('product')
      .select([
        'product.id',
        'product.quantity',
        'product.name',
        'product.price',
        'gender.type',
      ])
      .leftJoin('product.category', 'category')
      .leftJoin('product.gender', 'gender')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .leftJoinAndSelect('productImage.image', 'image')
      .where('category.id = :categoryId', { categoryId })
      .offset(page)
      .limit(take)
      .orderBy('product.name', 'ASC')
      .getMany();

    return productList;
  }

  async findById(id: string): Promise<Product> {
    const product = await this.createQueryBuilder('product')
    .select([
      'product.id',
      'product.quantity',
      'product.name',
      'product.price',
      'gender.type',
    ])
      .leftJoin('product.gender', 'gender')
      .leftJoinAndSelect('product.productImage', 'productImage')
      .leftJoinAndSelect('productImage.image', 'image')
      .leftJoinAndSelect('product.productClothingSize', 'productClothingSize')
      .leftJoinAndSelect('productClothingSize.clothingSize', 'clothingSize')
      .where('product.id = :id', {id})
      .getOne();

      return product;
  }
}
