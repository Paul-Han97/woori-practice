import { Module } from '@nestjs/common';
import { GenderRepository } from './gender.repository';

@Module({
  controllers: [],
  providers: [GenderRepository],
})
export class GenderModule {}
