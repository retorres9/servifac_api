import { Module } from '@nestjs/common';
import { CategoriesController } from './presentation/http/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '../../infrastructure/persistence/typeorm/category.entity';
import { CATEGORY_REPOSITORY } from '../../domain/repository/category.repository';
import { CategoryTypeormRepository } from '../../infrastructure/persistence/typeorm/category.repository';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoriesController],
  providers: [
    { provide: CATEGORY_REPOSITORY, useClass: CategoryTypeormRepository },
    CreateCategoryUseCase,
  ],
})
export class CategoriesModule {}
