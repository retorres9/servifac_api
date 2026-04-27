import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDomain } from '@core/categories/domain/category.domain';
import { Repository } from 'typeorm';
import { ICategory } from '@core/categories/domain/repository/category.interface';

export class CategoryRepository implements ICategory {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findByName(
    createCategoryDto: CategoryDomain
  ): Promise<CategoryDomain | null> {
    const name = createCategoryDto.strCategoryName;
    const categoryFound = await this.categoryRepository.findOne({
      where: { catName: name },
      relations: ['catFkCreatedBy']
    });
    return categoryFound
      ? new CategoryDomain(
        categoryFound.catName, 
        categoryFound.catDescription, 
        categoryFound.catCreatedBy.usrId, 
        categoryFound.catCreatedBy.usrFirstName,
        categoryFound.catId, 
      )
      : null;
  }

  async createCategory(
    createCategoryDto: CategoryDomain
  ): Promise<CategoryDomain> {
    const newCategoryEntity = this.categoryRepository.create({
      catName: createCategoryDto.strCategoryName,
      catDescription: createCategoryDto.strCategoryDescription,
      catCreatedBy: { usrId: createCategoryDto.intUserId },
    });
    const savedCategory = await this.categoryRepository.save(newCategoryEntity);
    return new CategoryDomain(savedCategory.catName, savedCategory.catDescription, savedCategory.catCreatedBy.usrId);
  }

  async getCategories(): Promise<CategoryDomain[]> {
    const categoryEntities = await this.categoryRepository.find();
    return categoryEntities.map(
      (entity) => new CategoryDomain(
        entity.catName, 
        entity.catDescription, 
        entity.catCreatedBy.usrId,
        entity.catCreatedBy.usrUsername,
        entity.catId, 
      )
    );
  }

  async getCategoryById(id: number): Promise<CategoryDomain | null> {
    const categoryEntity = await this.categoryRepository.findOne({
      where: { catId: id },
      relations: ['catFkCreatedBy']
    });
    return categoryEntity
      ? new CategoryDomain(
          categoryEntity.catName,
          categoryEntity.catDescription,
          categoryEntity.catCreatedBy.usrId,
          categoryEntity.catCreatedBy.usrUsername,
          categoryEntity.catId
        )
      : null;
  }
}
