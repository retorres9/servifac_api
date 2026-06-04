import { BadRequestException, Inject } from '@nestjs/common';
import { CATEGORY_INTERFACE } from '../../domain/repository/category.interface';
import type { ICategory } from '../../domain/repository/category.interface';
import type { CreateCategoryInput } from '../models/create-category.input';
import { type IUser, USER_INTERFACE } from '@core/users/domain/repository/user.interface';

export class CreateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoryRepository: ICategory,
    @Inject(USER_INTERFACE)
    private readonly userRepository: IUser

  ) {}

  async execute(
    categoryInput: CreateCategoryInput
  ): Promise<void> {
    const user = await this.userRepository.findById(categoryInput.intUserId);
    if (!user) {
      throw new BadRequestException({ message: 'User not found' });
    }
    const existingCategory =
      await this.categoryRepository.findByName(categoryInput);
    if (existingCategory) {
      throw new BadRequestException({ message: 'Category already exists' });
    }
    
    await this.categoryRepository.createCategory(categoryInput);
  }
}
