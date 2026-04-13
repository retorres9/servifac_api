import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormConfig } from './infrastructure/database/typeorm.config';
import { CategoriesModule } from './core/categories/interface/categories/categories.module';
import { LocationModule } from './core/location/location.module';
import { ProductModule } from './core/product/product.module';
import { UserModule } from './core/users/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ParameterModule } from './core/parameter/parameter.module';
import { WarehouseModule } from './core/warehouse/warehouse.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`, '.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        TypeormConfig(configService),
    }),
    ScheduleModule.forRoot(),
    CategoriesModule,
    LocationModule,
    ProductModule,
    UserModule,
    ParameterModule,
    WarehouseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
