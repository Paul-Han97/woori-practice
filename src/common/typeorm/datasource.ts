import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const entityPath: string = path.join(process.cwd(), '**/*.entity.{js, ts}');
const migrationPath: string = 'src/migrations/*.ts';
console.log(entityPath);

const dataSource = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  entities: [entityPath],
  migrations: [migrationPath],
  migrationsTableName: 'migrations',
  synchronize: true,
  retryAttempts: 1,
  logger: 'file',
  logging: true,
};

export const AppDataSource = new DataSource(<DataSourceOptions>dataSource);

export const typeOrmModuleOptions = <TypeOrmModuleOptions>dataSource;

