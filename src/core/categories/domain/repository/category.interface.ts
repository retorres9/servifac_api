import { GetCategoriesFiltersInput } from '@core/categories/application/models/get-categories.input';
import { CategoryDomain } from '../category.domain';

export const CATEGORY_INTERFACE = Symbol('CATEGORY_INTERFACE');

export interface ICategory {
  createCategory(createCategoryDto: CategoryDomain): Promise<CategoryDomain>;
  getCategories(input: GetCategoriesFiltersInput): Promise<CategoryDomain[]>;
  getCategoryById(id: number): Promise<CategoryDomain | null>;
  findByName(createCategoryDto: CategoryDomain): Promise<CategoryDomain | null>;
}
