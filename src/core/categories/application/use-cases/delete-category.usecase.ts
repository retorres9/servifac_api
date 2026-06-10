import { CATEGORY_INTERFACE } from "@core/categories/domain/repository/category.interface";
import { CategoryRepository } from "@core/categories/infrastructure/persistence/typeorm/category.repository";
import { Inject } from "@nestjs/common";

export class DeleteCategoryUseCase {
    constructor(
        @Inject(CATEGORY_INTERFACE) private readonly categoryRepository: CategoryRepository
    ) {}

    async execute(categoryId: number): Promise<void> {
        await this.categoryRepository.deleteCategory(categoryId);
    }
}