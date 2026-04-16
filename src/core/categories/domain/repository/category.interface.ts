import { CategoryDomain } from '../category.domain';

export const CATEGORY_INTERFACE = Symbol('CATEGORY_INTERFACE');

export interface ICategory {
  createCategory(createCategoryDto: CategoryDomain): Promise<CategoryDomain>;
  getCategories(): Promise<CategoryDomain[]>;
  findByName(createCategoryDto: CategoryDomain): Promise<CategoryDomain | null>;
}
