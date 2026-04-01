import { BadRequestException, Inject } from '@nestjs/common';
import { CATEGORY_REPOSITORY } from '../../domain/repository/category.repository';
import type { CategoryRepository } from '../../domain/repository/category.repository';
import type { CreateCategoryInput } from '../models/create-category.input';
import { CreateCategoryOutput } from '../models/create-category.output';

export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_REPOSITORY)
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(
    categoryInput: CreateCategoryInput
  ): Promise<CreateCategoryOutput> {
    const existingCategory =
      await this.categoryRepository.findByName(categoryInput);
    console.log('Existing Category:', existingCategory);
    if (existingCategory) {
      throw new BadRequestException({ message: 'Category already exists' });
    }

    const newCategory =
      await this.categoryRepository.createCategory(categoryInput);
    return newCategory;
  }
}
