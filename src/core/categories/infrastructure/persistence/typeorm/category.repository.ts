import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryDomain } from 'src/core/categories/domain/category.domain';
import { Repository } from 'typeorm';
import { ICategory } from 'src/core/categories/domain/repository/category.interface';
import { CreateCategoryInput } from 'src/core/categories/application/models/create-category.input';

export class CategoryTypeormRepository implements ICategory {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>
  ) {}

  async findByName(
    createCategoryDto: CreateCategoryInput
  ): Promise<CategoryDomain | null> {
    const name = createCategoryDto.strCategoryName;
    const categoryFound = await this.categoryRepository.findOne({
      where: { cat_name: name },
    });
    return categoryFound
      ? new CategoryDomain(categoryFound.cat_id, categoryFound.cat_name)
      : null;
  }

  async createCategory(
    createCategoryDto: CreateCategoryInput
  ): Promise<CategoryDomain> {
    const newCategoryEntity = this.categoryRepository.create({
      cat_name: createCategoryDto.strCategoryName,
    });
    const savedCategory = await this.categoryRepository.save(newCategoryEntity);
    return new CategoryDomain(savedCategory.cat_id, savedCategory.cat_name);
  }

  async getCategories(): Promise<CategoryDomain[]> {
    const categoryEntities = await this.categoryRepository.find();
    return categoryEntities.map(
      (entity) => new CategoryDomain(entity.cat_id, entity.cat_name)
    );
  }
}
