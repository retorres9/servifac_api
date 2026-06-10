import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDomain } from '@core/categories/domain/category.domain';
import { Repository } from 'typeorm';
import { ICategory } from '@core/categories/domain/repository/category.interface';
import { GetCategoriesFiltersInput } from '@core/categories/application/models/get-categories.input';
import { BadRequestException } from '@nestjs/common';

export class CategoryRepository implements ICategory {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}
  async updateCategory(updateCategory: CategoryDomain): Promise<void> {
    const category = await this.categoryRepository.preload({
      catId: updateCategory.intId,
      catName: updateCategory.strCategoryName,
      catDescription: updateCategory.strCategoryDescription,
      catUpdatedBy: { usrId: updateCategory.intUserId },
    });
    if (!category) {
      throw new Error('Category not found');
    }
    await this.categoryRepository.save(category);
  }

  async findByName(
    createCategoryDto: CategoryDomain
  ): Promise<CategoryDomain | null> {
    const name = createCategoryDto.strCategoryName;
    const categoryFound = await this.categoryRepository.findOne({
      where: { catName: name },
      relations: ['catCreatedBy']
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

  async getCategories(dto: GetCategoriesFiltersInput): Promise<CategoryDomain[]> {
    const { intPage = 1, intLimit = 10, strSearchTerm, dtFromDate, dtToDate, strSortBy = 'catCreatedAt', strSortOrder = 'DESC' } = dto;

    const qb = this.categoryRepository.createQueryBuilder('c')
    .leftJoinAndSelect('c.catCreatedBy', 'u');

    if (strSearchTerm) {
      qb.andWhere('c.catName LIKE :searchTerm OR c.catDescription LIKE :searchTerm', { searchTerm: `%${strSearchTerm}%` });
    }

    if (dtFromDate) qb.andWhere('c.catCreatedAt >= :fromDate', { fromDate: dtFromDate });
    if (dtToDate) qb.andWhere('c.catCreatedAt <= :toDate', { toDate: dtToDate });

    const allowedSortFields = ['catName', 'catCreatedAt', 'catDescription'];

    const sortBy = allowedSortFields.includes(strSortBy) ? strSortBy : 'catName';

    qb.orderBy(`c.${sortBy}`, strSortOrder === 'ASC' ? 'ASC' : 'DESC');

    const [items, total] = await qb
      .skip((intPage - 1) * intLimit).take(intLimit).getManyAndCount();
    return items.map(
      (entity) => new CategoryDomain(
        entity.catName, 
        entity.catDescription, 
        entity.catCreatedBy.usrId,
        entity.catCreatedBy.usrUsername,
        entity.catId, 
        total
      )
    );
  }

  async getCategoryById(id: number): Promise<CategoryDomain | null> {
    const categoryEntity = await this.categoryRepository.findOne({
      where: { catId: id },
      relations: ['catCreatedBy']
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

  async deleteCategory(categoryId: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { catId: categoryId } });
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    const categoryWithRelations = await this.categoryRepository.findOne({
      where: { catId: categoryId },
      relations: ['products']
    });
    if (categoryWithRelations?.products?.length) {
      throw new BadRequestException('Cannot delete category with associated products');
    }
    const updatedCategory = { ...category, catIsActive: false };
    await this.categoryRepository.save(updatedCategory);
  }
}
