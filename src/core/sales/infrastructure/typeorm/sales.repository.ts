import { InjectRepository } from "@nestjs/typeorm";
import { ISales } from "../../domain/interfaces/sales.interface";
import { SalesDomain } from "../../domain/sales.domain";
import { Sales } from "./sales.entity";
import { Repository } from "typeorm";
import { SaleLineDomain } from "src/core/salesLine/domain/saleLine.domain";
import { Parameter } from "src/core/parameter/infrastructure/typeorm/parameter.entity";

export class SalesRepository implements ISales {
    constructor(
        @InjectRepository(Sales)
        private readonly salesRepository: Repository<Sales>,
    ) {}
    async createSale(sale: SalesDomain): Promise<number> {
        const saleEntity = this.salesRepository.create({
            salFkIdCustomer: { cusId: sale.intCustomerId },
            salFkIdStatus: { prmId: sale.intIdStatus },
            salTotal: sale.dcmTotal,
            salTotalWithTax: sale.dcmTotalWithTax,
            salFkIdUser: { usrId: sale.intUserId },
        });
        const savedSale = await this.salesRepository.save(saleEntity);
        return savedSale.salId;
    }
    async getSaleById(id: number): Promise<SalesDomain | null> {
        const saleEntity = await this.salesRepository.findOne(
            { where: { salId: id },
            relations: ['salesLines'] }
        );
        if (!saleEntity) {
            return null;
        }
        return new SalesDomain(
            saleEntity.salFkIdCustomer.cusId,
            saleEntity.salFkIdStatus.prmId,
            saleEntity.salTotal,
            saleEntity.salTotalWithTax,
            saleEntity.salFkIdUser.usrId,
            saleEntity.salesLines.map(line => new SaleLineDomain(
                line.sllId,
                line.sllFkIdProduct.prodId,
                line.sllFkIdWarehouse.wrhId,
                line.sllQuantity,
                line.sllUnitPrice,
                line.sllTotalPrice,
                line.sllDiscount
            ))
        );
    }
    async getAllSales(): Promise<SalesDomain[]> {
        const saleEntities = await this.salesRepository.find({ relations: ['salesLines'] });
        return saleEntities.map(saleEntity => new SalesDomain(
            saleEntity.salFkIdCustomer.cusId,
            saleEntity.salFkIdStatus.prmId,
            saleEntity.salTotal,
            saleEntity.salTotalWithTax,
            saleEntity.salFkIdUser.usrId,
            saleEntity.salesLines.map(line => new SaleLineDomain(
                line.sllId,
                line.sllFkIdProduct.prodId,
                line.sllFkIdWarehouse.wrhId,
                line.sllQuantity,
                line.sllUnitPrice,
                line.sllTotalPrice,
                line.sllDiscount
            ))
        ));
    }
    async updateSale(id: number, sale: SalesDomain): Promise<void> {
        const saleEntity = await this.salesRepository.findOne({ where: { salId: id } });
        if (!saleEntity) {
            throw new Error('Sale not found');
        }
        saleEntity.salFkIdStatus = { prmId: sale.intIdStatus } as Parameter;
        await this.salesRepository.save(saleEntity);
    }
    async deleteSale(id: number): Promise<void> {
        const saleEntity = await this.salesRepository.findOne({ where: { salId: id } });
        if (!saleEntity) {
            throw new Error('Sale not found');
        }
        await this.salesRepository.remove(saleEntity);
    }
}