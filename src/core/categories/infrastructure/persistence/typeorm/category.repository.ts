import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { Category } from 'src/core/categories/domain/category.entity';
import { Repository } from 'typeorm';
import { CategoryRepository } from 'src/core/categories/domain/repository/category.repository';
import { CreateCategoryInput } from 'src/core/categories/application/models/create-category.input';

export class CategoryTypeormRepository implements CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findByName(
    createCategoryDto: CreateCategoryInput
  ): Promise<Category | null> {
    const name = createCategoryDto.strCategoryName;
    const categoryFound = await this.categoryRepository.findOne({
      where: { cat_name: name },
    });
    return categoryFound
      ? new Category(categoryFound.cat_id, categoryFound.cat_name)
      : null;
  }

  async createCategory(
    createCategoryDto: CreateCategoryInput
  ): Promise<Category> {
    const newCategoryEntity = this.categoryRepository.create({
      cat_name: createCategoryDto.strCategoryName,
    });
    const savedCategory = await this.categoryRepository.save(newCategoryEntity);
    return new Category(savedCategory.cat_id, savedCategory.cat_name);
  }

  async getCategories(): Promise<Category[]> {
    const categoryEntities = await this.categoryRepository.find();
    return categoryEntities.map(
      (entity) => new Category(entity.cat_id, entity.cat_name)
    );
  }
}
