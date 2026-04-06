import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';

@Controller('product')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('new')
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
}
