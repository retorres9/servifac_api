import { Inject } from '@nestjs/common';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import type { ICategory } from '../../domain/repository/category.interface';

export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoryRepository: ICategory
  ) {}

  async execute() {
    const categories = await this.categoryRepository.getCategories();
    return categories;
  }
}
