import { CATEGORY_INTERFACE } from "@core/categories/domain/repository/category.interface";
import { type CategoryRepository } from "@core/categories/infrastructure/persistence/typeorm/category.repository";
import { Inject } from "@nestjs/common";

export class GetCategoriesUseCase {
    constructor(
        @Inject(CATEGORY_INTERFACE) 
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute() {
        const categories = await this.categoryRepository.getCategories();
        return categories;
    }
}