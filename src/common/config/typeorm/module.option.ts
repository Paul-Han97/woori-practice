import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import path from 'path';

const entityPath: string = path.join(__dirname, '..', '**/*.{js, ts}');

export const typeOrmModuleOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    port: configService.get('DATABASE_PORT'),
    entities: [entityPath],
    synchronize: true,
    retryAttempts: 1,
    logger: 'file',
    logging: true,
  }),
  inject: [ConfigService],
};
