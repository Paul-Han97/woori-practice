import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CustomRepository } from 'src/common/typeorm/custom-decorator';
import { TypeOrmCustomModule } from 'src/common/typeorm/custom-module';
import { User } from './user.entity';
import { Gender } from 'src/gender/gender.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { GenderRepository } from 'src/gender/gender.repository';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([UserRepository, GenderRepository])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
