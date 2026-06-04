import { CATEGORY_INTERFACE, type ICategory } from "@core/categories/domain/repository/category.interface";
import { BadRequestException, Inject } from "@nestjs/common";
import { UpdateCategoryInput } from "../models/update-category.input";
import { type IUser, USER_INTERFACE } from "@core/users/domain/repository/user.interface";

export class UpdateCategoryUseCase {
  constructor(
    @Inject(CATEGORY_INTERFACE)
    private readonly categoriesService: ICategory,
    @Inject(USER_INTERFACE)
    private readonly userService: IUser
  ) {}

  async execute(updateCategoryDto: UpdateCategoryInput) {
    const user = await this.userService.findById(updateCategoryDto.intUserId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const category = await this.categoriesService.getCategoryById(updateCategoryDto.intId);
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    }
}