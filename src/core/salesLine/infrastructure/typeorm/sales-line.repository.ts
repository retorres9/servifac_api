import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISalesLine } from '../../domain/interfaces/saleLine.interface';
import { SalesLine } from './sales-line.entity';
import { SaleLineDomain } from '../../domain/saleLine.domain';

export class SalesLineRepository implements ISalesLine {
  constructor(
    @InjectRepository(SalesLine)
    private readonly salesLineRepository: Repository<SalesLine>,
  ) {}

  async createSaleLines(saleLines: SaleLineDomain[]): Promise<void> {
    if (!saleLines || saleLines.length === 0) return;
    const entities = saleLines.map(line => this.salesLineRepository.create({
      sllFkIdSales: { salId: line.intSaleId } as any,
      sllFkIdProduct: { prodId: line.intIdProduct } as any,
      sllFkIdWarehouse: { wrhId: line.intIdWarehouse } as any,
      sllQuantity: line.sllQuantity,
      sllUnitPrice: line.intUnitPrice,
      sllTotalPrice: line.intTotalPrice,
      sllDiscount: line.intDiscount,
    }));
    await this.salesLineRepository.save(entities);
  }

  async getSaleLineById(id: number): Promise<SaleLineDomain[] | null> {
    const lines = await this.salesLineRepository.find({ where: { sllFkIdSales: { salId: id } }, relations: ['sllFkIdProduct', 'sllFkIdWarehouse'] });
    if (!lines || lines.length === 0) return null;
    return lines.map(l => new SaleLineDomain(
      l.sllId,
      (l.sllFkIdProduct as any).prodId,
      (l.sllFkIdWarehouse as any).wrhId,
      l.sllQuantity,
      l.sllUnitPrice as any,
      l.sllTotalPrice as any,
      l.sllDiscount as any,
    ));
  }
}
