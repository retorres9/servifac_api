import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDomain } from 'src/core/categories/domain/category.domain';
import { Repository } from 'typeorm';
import { ICategory } from 'src/core/categories/domain/repository/category.interface';
import { CreateCategoryInput } from 'src/core/categories/application/models/create-category.input';

export class CategoryTypeormRepository implements ICategory {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findByName(
    createCategoryDto: CreateCategoryInput
  ): Promise<CategoryDomain | null> {
    const name = createCategoryDto.strCategoryName;
    const categoryFound = await this.categoryRepository.findOne({
      where: { catName: name },
    });
    return categoryFound
      ? new CategoryDomain(categoryFound.catId, categoryFound.catName)
      : null;
  }

  async createCategory(
    createCategoryDto: CreateCategoryInput
  ): Promise<CategoryDomain> {
    const newCategoryEntity = this.categoryRepository.create({
      catName: createCategoryDto.strCategoryName,
    });
    const savedCategory = await this.categoryRepository.save(newCategoryEntity);
    return new CategoryDomain(savedCategory.catId, savedCategory.catName);
  }

  async getCategories(): Promise<CategoryDomain[]> {
    const categoryEntities = await this.categoryRepository.find();
    return categoryEntities.map(
      (entity) => new CategoryDomain(entity.catId, entity.catName)
    );
  }
}
