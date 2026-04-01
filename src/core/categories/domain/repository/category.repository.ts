import { Category } from '../category.entity';

export const CATEGORY_REPOSITORY = Symbol('CATEGORY_REPOSITORY');

export interface CategoryRepository {
  createCategory(createCategoryDto: Category): Promise<Category>;
  getCategories(): Promise<Category[]>;
  findByName(createCategoryDto: Category): Promise<Category | null>;
}
