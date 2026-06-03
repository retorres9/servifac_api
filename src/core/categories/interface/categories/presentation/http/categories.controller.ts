import { Controller, Post, Body,  Patch } from '@nestjs/common';
import { CreateCategoryUseCase } from '@core/categories/application/use-cases/create-category.usecase';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { GetCategoriesDto } from '../../dto/get-categories.dto';
import { GetCategoriesUseCase } from '@core/categories/application/use-cases/get-categories.usecase';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { UpdateCategoryUseCase } from '@core/categories/application/use-cases/upd-category.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoriesUseCase: GetCategoriesUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase

  ) {}

  @Post('new')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

   @Post('findAll')
   findOne(@Body() getCategoryByIdDto: GetCategoriesDto) {
    const input = {
      intPage: getCategoryByIdDto.intPage ?? 1,
      intLimit: getCategoryByIdDto.intLimit ?? 10,
      strSearchTerm: getCategoryByIdDto.strSearchTerm,
      dtFromDate: getCategoryByIdDto.dtFromDate,
      dtToDate: getCategoryByIdDto.dtToDate,
    }
     return this.getCategoriesUseCase.execute(input);
   }

  @Patch(':id')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.updateCategoryUseCase.execute(updateCategoryDto);
  }
}
