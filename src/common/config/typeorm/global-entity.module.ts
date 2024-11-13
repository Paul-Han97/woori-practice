import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [],
  exports: [GlobalEntityModule],
})
export class GlobalEntityModule {}
