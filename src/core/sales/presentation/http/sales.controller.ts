import { Body, Controller, Post } from '@nestjs/common';
import { CreateSaleDto } from '../../presentation/dto/create-sale.dto';
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
      body.lines.map(l => new SaleLineDomain(0, l.productId, l.warehouseId, l.quantity, l.unitPrice, l.quantity * l.unitPrice, l.discount ?? 0))
    );
    await this.createSaleUseCase.execute(saleDomain);
    return { ok: true };
  }
}
