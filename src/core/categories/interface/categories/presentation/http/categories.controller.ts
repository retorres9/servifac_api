import { Controller, Post, Body, Param } from '@nestjs/common';
import { CreateCategoryUseCase } from '@core/categories/application/use-cases/create-category.usecase';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { GetCategoriesDto } from '../../dto/get-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase

  ) {}

  @Post('new')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createCategoryUseCase.execute(createCategoryDto);
  }

  // @Get()
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

   @Post('find')
   findOne(@Body() getCategoryByIdDto: GetCategoriesDto) {
    const { intId } = getCategoryByIdDto;
     return this.(intId);
   }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
