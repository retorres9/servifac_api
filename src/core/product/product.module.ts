import { Module } from '@nestjs/common';
import { ProductController } from './interface/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './infrastructure/persistence/typeorm/product.entity';
import { PRODUCT_INTERFACE } from './domain/repository/product.interface';
import { ProductTypeormRespository } from './infrastructure/persistence/typeorm/product.repository';
import { CreateProductUseCase } from './application/use-cases/create-product.usecase';


@Module({
  imports: [
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductController],
  providers: [{
    provide: PRODUCT_INTERFACE,
    useClass: ProductTypeormRespository,
  },
  CreateProductUseCase],
})
export class ProductModule {}
