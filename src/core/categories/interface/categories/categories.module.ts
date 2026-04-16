import { Module } from '@nestjs/common';
import { CategoriesController } from './presentation/http/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../infrastructure/persistence/typeorm/category.entity';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import { CategoryTypeormRepository } from '../../infrastructure/persistence/typeorm/category.repository';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [
    { provide: CATEGORY_INTERFACE, useClass: CategoryTypeormRepository },
    CreateCategoryUseCase,
  ],
})
export class CategoriesModule {}
