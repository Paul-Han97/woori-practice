import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom.module';
import { CategoryRepository } from './entities/category.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
