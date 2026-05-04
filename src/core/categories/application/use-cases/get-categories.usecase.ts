import { Inject } from '@nestjs/common';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import type { ICategory } from '../../domain/repository/category.interface';
import { GetCategoriesFiltersInput } from '../models/get-categories.input';

export class GetCategoriesUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoryRepository: ICategory
  ) {}

  async execute(getCategoriesInput: GetCategoriesFiltersInput) {
    const categories = await this.categoryRepository.getCategories(getCategoriesInput);
    return categories;
  }
}
