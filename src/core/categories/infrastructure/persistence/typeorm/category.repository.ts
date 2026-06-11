import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryDomain } from '@core/categories/domain/category.domain';
import { Repository } from 'typeorm';
import { ICategory } from '@core/categories/domain/repository/category.interface';
import { GetCategoriesFiltersInput } from '@core/categories/application/models/get-categories.input';
import { BadRequestException, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from '@common/Redis/redis.provider';

export class CategoryRepository implements ICategory {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @Inject(REDIS_CLIENT) 
    private readonly redisClient: Redis
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
    const redisKey = `products:findByName:${name}`;
    try {
      const cachedCategory = await this.redisClient.get(redisKey);
      if (cachedCategory) {
        const parsedCategory = JSON.parse(cachedCategory);
        return new CategoryDomain(
          parsedCategory.strCategoryName, 
          parsedCategory.strCategoryDescription, 
          parsedCategory.intUserId, 
          parsedCategory.strUser,
          parsedCategory.intId
        );
      }
    }
    catch (error) {
      console.error('Error accessing Redis:', error);
    }
    const categoryFound = await this.categoryRepository.findOne({
      where: { catName: name },
      relations: ['catCreatedBy']
    });

    const result = categoryFound ? new CategoryDomain(
        categoryFound.catName, 
        categoryFound.catDescription,
        categoryFound.catCreatedBy.usrId,
        categoryFound.catCreatedBy.usrUsername,
        categoryFound.catId
      )
      : null;

    try {
      await this.redisClient.set(redisKey, JSON.stringify(result), 'EX', 15);
    } catch (error) {
      console.error('Error setting Redis cache:', error);
    }
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
    try {
      const redisKey = `categories:getCategories:1:10::`;
      await this.redisClient.del(redisKey);
    } catch (error) {
      console.error('Error clearing Redis cache:', error);
    }
    return new CategoryDomain(savedCategory.catName, savedCategory.catDescription, savedCategory.catCreatedBy.usrId);
  }

  async getCategories(dto: GetCategoriesFiltersInput): Promise<CategoryDomain[]> {
    const { intPage = 1, intLimit = 10, strSearchTerm, dtFromDate, dtToDate, strSortBy = 'catCreatedAt', strSortOrder = 'DESC' } = dto;
    console.log('GetCategoriesFiltersInput:', dto);
    const redisKey = `categories:getCategories:${intPage}:${intLimit}:${strSearchTerm || ''}:${dtFromDate?.toISOString() || ''}:${dtToDate?.toISOString() || ''}:${strSortBy}:${strSortOrder}`;

    try {
      const cachedCategories = await this.redisClient.get(redisKey);
      if (cachedCategories) {
        const parsedCategories = JSON.parse(cachedCategories);
        return parsedCategories.map(
          (entity) => new CategoryDomain(
            entity.catName, 
            entity.catDescription, 
            entity.catCreatedBy.usrId,
            entity.catCreatedBy.usrUsername,
            entity.catId, 
            entity.total
          )
        );
      }
    } catch (error) {
      console.error('Error accessing Redis:', error);
    }
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
    try {
      await this.redisClient.set(redisKey, JSON.stringify(items.map(
        (entity) => new CategoryDomain(
          entity.catName, 
          entity.catDescription, 
          entity.catCreatedBy.usrId,
          entity.catCreatedBy.usrUsername,
          entity.catId, 
          total
        )
      )), 'EX', 15);
    } catch (error) {
      console.error('Error setting Redis cache:', error);
    }
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
    const redisKey = `categories:getCategoryById:${id}`;
    try {
      const cachedCategory = await this.redisClient.get(redisKey);
      if (cachedCategory) {
        const parsedCategory = JSON.parse(cachedCategory);
        return new CategoryDomain(
          parsedCategory.strCategoryName,
          parsedCategory.strCategoryDescription,
          parsedCategory.intUserId,
          parsedCategory.strUser,
          parsedCategory.intCategoryId,
          parsedCategory.intTotal
        );
      }
    } catch (error) {
      console.error('Error accessing Redis:', error);
    }
    const categoryEntity = await this.categoryRepository.findOne({
      where: { catId: id },
      relations: ['catCreatedBy']
    });
    try {      await this.redisClient.set(redisKey, JSON.stringify(categoryEntity ? {
        strCategoryName: categoryEntity.catName,
        strCategoryDescription: categoryEntity.catDescription,
        intUserId: categoryEntity.catCreatedBy.usrId,
        strUser: categoryEntity.catCreatedBy.usrUsername,
        intCategoryId: categoryEntity.catId,
        intTotal: 0
      } : null), 'EX', 15);
    } catch (error) {
      console.error('Error setting Redis cache:', error);
    }
    return categoryEntity
      ? new CategoryDomain(
          categoryEntity.catName,
          categoryEntity.catDescription,
          categoryEntity.catCreatedBy.usrId,
          categoryEntity.catCreatedBy.usrUsername,
          categoryEntity.catId,
          0
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
