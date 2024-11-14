import { Global, Module } from '@nestjs/common';
import { TypeOrmCustomModule } from './custom-module';
import { UserRepository } from 'src/user/user.repository';
import { GenderRepository } from 'src/gender/gender.repository';

@Global()
@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserRepository, GenderRepository])],
  controllers: [],
  providers: [],
})
export class GlobalEntity {}
