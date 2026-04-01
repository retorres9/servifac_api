import { DataSource } from 'typeorm';
import { baseTypeOrmConfig } from './typeorm.base.config';
import { DataSourceOptions } from 'typeorm/browser';

export const AppDataSource = new DataSource({
  ...(baseTypeOrmConfig as DataSourceOptions),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
