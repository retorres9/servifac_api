import { Module } from '@nestjs/common';
import { CategoriesController } from './presentation/http/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../infrastructure/persistence/typeorm/category.entity';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import { CategoryRepository } from '../../infrastructure/persistence/typeorm/category.repository';
import { CreateCategoryUseCase } from '../../application/use-cases/create-category.usecase';
import { GetCategoriesUseCase } from '@core/categories/application/use-cases/get-categories.usecase';
import { UpdateCategoryUseCase } from '@core/categories/application/use-cases/upd-category.usecase';
import { UserModule } from '@core/users/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    UserModule
  ],
  controllers: [CategoriesController],
  providers: [
    { provide: CATEGORY_INTERFACE, useClass: CategoryRepository },
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase
  ],
  exports: [CATEGORY_INTERFACE]
})
export class CategoriesModule {}
