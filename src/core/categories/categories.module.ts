import { Module } from '@nestjs/common';
import { CategoriesController } from '@core/categories/interface/categories/presentation/http/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@core/categories/infrastructure/persistence/typeorm/category.entity';
import { CATEGORY_INTERFACE } from '@core/categories/domain/repository/category.interface';
import { CategoryRepository } from '@core/categories/infrastructure/persistence/typeorm/category.repository';
import { CreateCategoryUseCase } from '@core/categories/application/use-cases/create-category.usecase';
import { GetCategoriesUseCase } from '@core/categories/application/use-cases/get-categories.usecase';
import { UpdateCategoryUseCase } from '@core/categories/application/use-cases/upd-category.usecase';
import { UserModule } from '@core/users/user.module';
import { DeleteCategoryUseCase } from '@core/categories/application/use-cases/delete-category.usecase';
import { RedisModule } from '@common/Redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    UserModule,
    RedisModule
  ],
  controllers: [CategoriesController],
  providers: [
    { provide: CATEGORY_INTERFACE, useClass: CategoryRepository },
    CreateCategoryUseCase,
    GetCategoriesUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase
  ],
  exports: [CATEGORY_INTERFACE]
})
export class CategoriesModule {}
