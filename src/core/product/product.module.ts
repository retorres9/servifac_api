import { Module } from '@nestjs/common';
import { ProductController } from './interface/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastructure/persistence/typeorm/product.entity';
import { PRODUCT_REPOSITORY } from './domain/repository/product.repository';
import { ProductTypeormRespository } from './infrastructure/persistence/typeorm/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [ProductController],
  providers: [{
    provide: PRODUCT_REPOSITORY,
    useClass: ProductTypeormRespository,
  },
  CreateProductUseCase],
})
export class ProductModule {}
