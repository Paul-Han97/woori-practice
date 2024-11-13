import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { CUSTOM_REPOSITORY } from 'src/common/constants/common.constant';
import { DataSource } from 'typeorm';

export class CustomRepositoryModule extends TypeOrmModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];
    for (const repository of repositories) {
      const entity = Reflect.getMetadata(CUSTOM_REPOSITORY, repository);
      if (!entity) {
        continue;
      }
      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<any>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }
    return {
      exports: providers,
      module: CustomRepositoryModule,
      providers,
    };
  }
}
