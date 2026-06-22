import { InjectRepository } from "@nestjs/typeorm";
import { ISales } from "../../domain/interfaces/sales.interface";
import { SalesDomain } from "../../domain/sales.domain";
import { Sales } from "./sales.entity";
import { EntityManager, Repository } from "typeorm";
import { SaleLineDomain } from "@core/salesLine/domain/saleLine.domain";
import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { TransactionContext } from "@common/domain/transaction.manager";

export class SalesRepository implements ISales {
    constructor(
        @InjectRepository(Sales)
        private readonly salesRepository: Repository<Sales>,
    ) {}
    async createSale(sale: SalesDomain, ctx: TransactionContext): Promise<number> {
        const repo = ctx ? (ctx as EntityManager).getRepository(Sales) : this.salesRepository;
        const saleEntity = repo.create({
            salFkIdCustomer: sale.intCustomerId ? { cusId: sale.intCustomerId } as any : null,
            salFkIdStatus: { prmId: sale.intIdStatus } as any,
            salTotal: sale.dcmTotal,
            salTotalWithTax: sale.dcmTotalWithTax,
            salFkIdUser: sale.intUserId ? { usrId: sale.intUserId } as any : null,
        });
        const savedSale = await repo.save(saleEntity);
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