import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { baseTypeOrmConfig } from './typeorm.base.config';
import { ConfigService } from '@nestjs/config';

export const TypeormConfig = (
  configService?: ConfigService
): TypeOrmModuleOptions => {
  const password = configService?.get<string>('DB_PASSWORD');
  const host = configService?.get<string>('DB_HOST');
  const port = Number(configService?.get<number | string>('DB_PORT') ?? 5432);
  const username = configService?.get<string>('DB_USERNAME');
  const database = configService?.get<string>('DB_NAME');
  console.log('Database Host:', configService);
  return {
    ...baseTypeOrmConfig,
    host,
    port,
    username,
    password,
    database,
    autoLoadEntities: true,
  } as TypeOrmModuleOptions;
};
