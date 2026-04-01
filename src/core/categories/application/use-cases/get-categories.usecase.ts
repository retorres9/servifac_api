import { Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../domain/repository/category.repository';
import type { CategoryRepository } from '../../domain/repository/category.repository';

export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute() {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }
}
