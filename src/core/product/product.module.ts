import { Module } from '@nestjs/common';
import { ProductController } from './interface/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infrastructure/persistence/typeorm/product.entity';
import { PRODUCT_INTERFACE } from './domain/repository/product.interface';
import { ProductRepository } from './infrastructure/persistence/typeorm/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { RedisModule } from '@common/Redis/redis.module';
import { GetProductCodeUseCase } from './application/use-cases/get-product-code.usecase';
import { SearchProductUseCase } from './application/use-cases/search-product.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    RedisModule
  ],
  controllers: [ProductController],
  providers: [{
      provide: PRODUCT_INTERFACE,
      useClass: ProductRepository,
    },
    CreateProductUseCase,
    GetProductCodeUseCase,
    SearchProductUseCase,
    GetProductByIdUseCase
  ],
  exports: [PRODUCT_INTERFACE]
})
export class ProductModule {}
