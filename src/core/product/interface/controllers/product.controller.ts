import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { CreateProductUseCase } from '../../application/use-cases/create-product.usecase';
import { GetProductCodeUseCase } from '@core/product/application/use-cases/get-product-code.usecase';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductByCodeUseCase: GetProductCodeUseCase
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }

  @Post('find')
  findProducts() {
    // Implement the logic to find products based on criteria
  }

  @Get('autocomplete')
  autocompleteProducts() {
    // Implement the logic to autocomplete product names
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    // Implement the logic to get a product by its ID
  }

  @Get('code/:code')
  async getProductByCode(@Param('code') code: string) {
    return await this.getProductByCodeUseCase.execute(code);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string/*, @Body() updateProductDto: UpdateProductDto*/) {
    // Implement the logic to update a product by its ID
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    // Implement the logic to delete a product by its ID
  }

  @Post('import')
  importProducts() {
    // Implement the logic to import products from an Excel file
  }

  @Get(':id/stock')
  getProductStock(@Param('id') id: string) {
    // Implement the logic to get the stock of a product by its ID
  }

  @Post(':id/stock/movement')
  recordStockMovement(@Param('id') id: string/*, @Body() stockMovementDto: StockMovementDto*/) {
    // Implement the logic to record a stock movement for a product by its ID
  }

  @Post(':id/stock/transfer')
  transferStock(@Param('id') id: string/*, @Body() stockTransferDto: StockTransferDto*/) {
    // Implement the logic to transfer stock for a product by its ID
  }

  @Get('low-stock')
  getLowStockProducts() {
    // Implement the logic to get products with low stock
  }

  @Get(':id/providers')
  getProductProviders(@Param('id') id: string) {
    // Implement the logic to get the providers of a product by its ID
  }
}
