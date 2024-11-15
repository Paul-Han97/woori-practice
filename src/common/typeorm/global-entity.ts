import { Global, Module } from '@nestjs/common';
import { TypeOrmCustomModule } from './custom-module';
import { GenderRepository } from 'src/gender/entities/gender.repository';
import { UserRepository } from 'src/user/entities/user.repository';

@Global()
@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserRepository, GenderRepository])],
  controllers: [],
  providers: [],
})
export class GlobalEntity {}
