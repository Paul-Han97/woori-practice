import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './common/config/module.option';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './common/config/typeorm/module.option';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
