import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModuleOptions } from './common/config/config-module-option';
import { typeOrmModuleOptions } from './common/typeorm/datasource';
import { GenderModule } from './gender/gender.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    // GlobalEntity,
    // TypeOrmCustomModule.forCustomRepository([UserRepository]),
    UserModule,
    GenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
