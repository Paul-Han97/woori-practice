import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom-module';
import { GenderRepository } from 'src/gender/entities/gender.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './entities/user.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserRepository, GenderRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
