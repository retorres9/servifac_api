import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSaleDto } from '../dto/create-sale.dto';
import { CreateSaleUseCase } from '@core/sales/application/use-cases/createSale.usecase';
import { SalesDomain } from '@core/sales/domain/sales.domain';
import { SaleLineDomain } from '@core/salesLine/domain/saleLine.domain';

@Controller('sales')
export class SalesController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
  ) {}

  @Post()
  async create(@Body() body: CreateSaleDto) {
    const saleDomain = new SalesDomain(
      body.customerId,
      1,
      body.lines.reduce((s, l) => s + (l.quantity * l.unitPrice), 0),
      0,
      body.userId,
      body.lines.map(l => new SaleLineDomain(0, l.productId, body.warehouseId, l.quantity, l.unitPrice, l.quantity * l.unitPrice, l.discount ?? 0))
    );
    await this.createSaleUseCase.execute(saleDomain);
    return { ok: true };
  }

  @Post('search')
  searchSales() {
      // Search sales with pagination, filtering by date range, customer, status, and sorting. Cache results in Redis for 5 minutes.
  }

  @Get(':id')
  getSale(@Param('id') id: string) {
      // Retrieve a sale by its ID, including lines, payments, stock movements, and receipt.
  }

  @Post(':id/receipt')
  generateReceipt(@Param('id') id: string) {
      // Generate a PDF receipt for the sale, including all details and a QR code linking to the online receipt.
  }
}
