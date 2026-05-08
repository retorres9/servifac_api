import { CATEGORY_INTERFACE, type ICategory } from "@core/categories/domain/repository/category.interface";
import { Inject } from "@nestjs/common";
import { UpdateCategoryInput } from "../models/update-category.input";

export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoriesService: ICategory,
  ) {}

  async execute(updateCategoryDto: UpdateCategoryInput) {
        const category = await this.categoriesService.getCategoryById(updateCategoryDto.intId);
        if (!category) {
        throw new Error('Category not found');
        }
    }
}