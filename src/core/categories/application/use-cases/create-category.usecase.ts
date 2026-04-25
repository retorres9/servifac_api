import { BadRequestException, Inject } from '@nestjs/common';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import type { ICategory } from '../../domain/repository/category.interface';
import type { CreateCategoryInput } from '../models/create-category.input';

export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoryRepository: ICategory
  ) {}

  async execute(
    categoryInput: CreateCategoryInput
  ): Promise<void> {
    const existingCategory =
      await this.categoryRepository.findByName(categoryInput);
    console.log('Existing Category:', existingCategory);
    if (existingCategory) {
      throw new BadRequestException({ message: 'Category already exists' });
    }

    await this.categoryRepository.createCategory(categoryInput);
  }
}
