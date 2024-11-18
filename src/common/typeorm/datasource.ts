import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Gender } from 'src/gender/entities/gender.entity';
import { User } from 'src/user/entities/user.entity';
import { Admin } from 'src/admin/entities/admin.entity';
import { Category } from 'src/category/entities/category.entity';
import { ClothingSize } from 'src/clothing-size/entities/clothing-size.entity';
import { DeliveryAddress } from 'src/delivery-address/entities/delivery-address.entity';
import { Image } from 'src/image/entities/image.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { OrderState } from 'src/order-state/entities/order-state.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductClothingSize } from 'src/product-clothing-size/entities/product-clothing-size.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';

const migrationPath: string = 'dist/migrations/*.js';

const dataSource = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  entities: [
    User,
    Gender,
    Admin,
    Category,
    ClothingSize,
    DeliveryAddress,
    Image,
    Order,
    OrderProduct,
    OrderState,
    Product,
    ProductClothingSize,
    ProductImage,
    SubCategory,
  ],
  migrations: [migrationPath],
  migrationsTableName: 'migrations',
  synchronize: false,
  retryAttempts: 1,
  logger: 'file',
  logging: true,
};

export const AppDataSource = new DataSource(<DataSourceOptions>dataSource);

export const typeOrmModuleOptions = <TypeOrmModuleOptions>dataSource;
